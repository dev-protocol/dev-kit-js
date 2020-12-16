import bent from 'bent'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { always } from 'ramda'
import { addresses } from '../addresses'
import { createDevkitContract, DevkitContract } from '../contract'

const DEV_OWN_HTTP_PROVIDER = 'https://devprotocolnode.net/ethereum/mainnet'
const DEV_GRAPHQL_ENDPOINT = 'https://api.devprotocol.xyz/v1/graphql'
const THEGRAPH_UNISWAP_ENDPOINT =
	'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'
const DEV_TEAM_WALLET_ADDRESS = '0x5caf454ba92e6f2c929df14667ee360ed9fd5b26'

const falsyOrZero = <T>(num?: T): T | 0 => (num ? num : 0)
const toNaturalBasis = new BigNumber(10).pow(18)
export const toNaturalNumber = (num?: number | string | BigNumber): BigNumber =>
	new BigNumber(falsyOrZero(num)).div(toNaturalBasis)

export type DevStats = {
	readonly devPrice: string
	readonly totalCap: string
	readonly marketCap: string
	readonly stakingRatio: string
	readonly stakingAmount: string
	readonly stakerAPY: string
	readonly creatorAPY: string
	readonly annualSupplyGrowthRatio: string
	readonly creatorsRewardsDEV: string
	readonly creatorsRewardsUSD: string
}

type graphBundle = {
	readonly bundle: {
		readonly ethPrice: string
	}
}

type graphToken = {
	readonly token: {
		readonly derivedETH: string
	}
}

type propertyFactoryCreateAggregate = {
	readonly property_factory_create_aggregate: {
		readonly aggregate: {
			readonly count: string
		}
	}
}

export type GetStatsCaller = () => () => Promise<DevStats>
type GetEthPriceCaller = () => Promise<graphBundle>
type GetDevEthPriceCaller = () => Promise<graphToken>

// eslint-disable-next-line functional/functional-parameters
const getEthPrice: GetEthPriceCaller = () => {
	return bent(
		THEGRAPH_UNISWAP_ENDPOINT,
		'GET',
		'json'
	)('/', {
		query: `{
			bundle(id: 1) {
				ethPrice
			}
		}`,
	}).then((r) => r as graphBundle)
}

// eslint-disable-next-line functional/functional-parameters
const getDevEthPrice: GetDevEthPriceCaller = () => {
	return bent(
		THEGRAPH_UNISWAP_ENDPOINT,
		'GET',
		'json'
	)('/', {
		query: `{
			token(id: '${DEV_TEAM_WALLET_ADDRESS}') {
				derivedETH
			}
		}`,
	}).then((r) => r as graphToken)
}

// eslint-disable-next-line functional/functional-parameters
const getDevPrice: () => Promise<BigNumber> = async () => {
	const ethPrice = await getEthPrice()
	const devEthPrice = await getDevEthPrice()

	const devPrice =
		ethPrice &&
		Number(ethPrice?.bundle.ethPrice) * Number(devEthPrice?.token.derivedETH)
	return new BigNumber(devPrice || '0')
}

const getTotalCap: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['token']()
	const totalSupply = await devkit.dev(devContractAddress).totalSupply()

	const devPrice = await getDevPrice()

	const devTotalCap = new BigNumber(
		devPrice.toNumber() * toNaturalNumber(totalSupply).toNumber()
	)
	return devTotalCap
}

const getCirculatingSupply: (
	devkit: DevkitContract
) => Promise<BigNumber> = async (devkit: DevkitContract) => {
	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['token']()
	const totalSupply = await devkit.dev(devContractAddress).totalSupply()
	const teamAmount = await devkit
		.dev(devContractAddress)
		.balanceOf(DEV_TEAM_WALLET_ADDRESS)
	const circulatingSupply = new BigNumber(totalSupply || '0').minus(
		new BigNumber(teamAmount || '0')
	)

	return toNaturalNumber(circulatingSupply)
}

const getMarketCap: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	// use from input parameter
	const devPrice = await getDevPrice()

	const circulatingSupply = await getCirculatingSupply(devkit)

	const marketCap = devPrice.multipliedBy(circulatingSupply)

	return marketCap
}

const getTotalStakingAmount: (
	devkit: DevkitContract
) => Promise<BigNumber> = async (devkit: DevkitContract) => {
	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['lockup']()
	const totalStakingAmount = await devkit
		.lockup(devContractAddress)
		.getAllValue()

	return new BigNumber(totalStakingAmount)
}

const getStakingRatio: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	const totalStakingAmount = await getTotalStakingAmount(devkit)
	const circulatingSupply = await getCirculatingSupply(devkit)

	return new BigNumber(totalStakingAmount).div(circulatingSupply)
}

const getStakingAmount: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	// use from input parameter
	const devPrice = await getDevPrice()
	const totalStakingAmount = await getTotalStakingAmount(devkit)

	return new BigNumber(totalStakingAmount).multipliedBy(devPrice.toNumber())
}

const getAPY: (
	devkit: DevkitContract
) => Promise<{
	readonly stakerAPY: BigNumber
	readonly creatorAPY: BigNumber
}> = async (devkit: DevkitContract) => {
	const allocatorContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['allocator']()
	const maxRewards = await devkit
		.allocator(allocatorContractAddress)
		.calculateMaxRewardsPerBlock()

	// TODO: functionize
	const totalStakingAmount = await getStakingAmount(devkit)

	const policyContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['policy']()
	const holdersShare = await devkit
		.policy(policyContractAddress)
		.holdersShare(maxRewards, totalStakingAmount.toFormat())

	const stakers = new BigNumber(maxRewards).minus(new BigNumber(holdersShare))
	const year = new BigNumber(2102400)
	const stakerAPY = stakers.times(year).div(totalStakingAmount).times(100)
	const creatorAPY = new BigNumber(holdersShare)
		.times(year)
		.div(totalStakingAmount)
		.times(100)

	return { stakerAPY, creatorAPY }
}

const getSupplyGrowth: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	const allocatorContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['allocator']()
	const maxRewards = await devkit
		.allocator(allocatorContractAddress)
		.calculateMaxRewardsPerBlock()

	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['token']()
	const totalSupply = await devkit.dev(devContractAddress).totalSupply()

	const year = new BigNumber(2102400)
	const annualSupplyGrowthRatio = new BigNumber(maxRewards)
		.times(year)
		.div(totalSupply)
		.times(100)

	return annualSupplyGrowthRatio
}

// eslint-disable-next-line functional/functional-parameters
const getAssetOnboarded: () => Promise<string> = async () => {
	const fetcher = always(
		bent(DEV_GRAPHQL_ENDPOINT)('/', {
			query: `{
			property_factory_create_aggregate() {
				aggregate {
					count
				}
			}
		}`,
		}).then((r) => r as propertyFactoryCreateAggregate)
	)
	const assets = await fetcher()
	return assets.property_factory_create_aggregate.aggregate.count
}

const getCreatorsRewardsDev: (
	devkit: DevkitContract,
	creatorAPY: BigNumber
) => Promise<BigNumber> = async (
	devkit: DevkitContract,
	creatorAPY: BigNumber
) => {
	const totalStakingAmount = await getTotalStakingAmount(devkit)
	const creatorsRewardsDev = creatorAPY
		.div(100)
		.multipliedBy(totalStakingAmount)
	return creatorsRewardsDev
}

// eslint-disable-next-line functional/functional-parameters
export const getStats: GetStatsCaller = () => {
	const web3 = new Web3(DEV_OWN_HTTP_PROVIDER)

	// eslint-disable-next-line functional/functional-parameters
	return async () => {
		const devkit = await createDevkitContract(web3)

		const devPrice = await getDevPrice()
		const totalCap = await getTotalCap(devkit)
		const marketCap = await getMarketCap(devkit)
		const stakingRatio = await getStakingRatio(devkit)
		const stakingAmount = await getStakingAmount(devkit)
		const { stakerAPY, creatorAPY } = await getAPY(devkit)
		const annualSupplyGrowthRatio = await getSupplyGrowth(devkit)
		const assetOnboarded = await getAssetOnboarded()
		const creatorsRewardsDEV = await getCreatorsRewardsDev(devkit, creatorAPY)
		const creatorsRewardsUSD = devPrice.multipliedBy(creatorsRewardsDEV)

		return {
			devPrice: devPrice.dp(2).toFormat(),
			totalCap: totalCap.dp(0).toFormat(),
			marketCap: marketCap.dp(0).toFormat(),
			stakingRatio: stakingRatio.toFormat(),
			stakingAmount: stakingAmount.toFormat(),
			stakerAPY: stakerAPY.toFormat(),
			creatorAPY: creatorAPY.toFormat(),
			annualSupplyGrowthRatio: annualSupplyGrowthRatio.toFormat(),
			assetOnboarded: assetOnboarded,
			creatorsRewardsDEV: creatorsRewardsDEV.toFormat(),
			creatorsRewardsUSD: creatorsRewardsUSD.toFormat(),
		}
	}
}
