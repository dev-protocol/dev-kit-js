/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
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
const DEV_TEAM_WALLET_ADDRESS = '0xe23fe51187a807d56189212591f5525127003bdf'

const falsyOrZero = <T>(num?: T): T | 0 => (num ? num : 0)
const toNaturalBasis = new BigNumber(10).pow(18)
export const toNaturalNumber = (num?: number | string | BigNumber): BigNumber =>
	new BigNumber(falsyOrZero(num)).div(toNaturalBasis)

export type DevStats = {
	readonly devPrice: number
	readonly totalCap: number
	readonly marketCap: number
	readonly stakingRatio: number
	readonly stakingAmount: number
	readonly stakerAPY: number
	readonly creatorAPY: number
	readonly annualSupplyGrowthRatio: number
	readonly creatorsRewardsDEV: number
	readonly creatorsRewardsUSD: number
}

type graphBundle = {
	readonly data: {
		readonly bundle: {
			readonly ethPrice: string
		}
	}
}

type graphToken = {
	readonly data: {
		readonly token: {
			readonly derivedETH: string
		}
	}
}

type propertyFactoryCreateAggregate = {
	readonly data: {
		readonly property_factory_create_aggregate: {
			readonly aggregate: {
				readonly count: number
			}
		}
	}
}

export type GetStatsCaller = () => Promise<DevStats>
type GetEthPriceCaller = () => Promise<graphBundle>
type GetDevEthPriceCaller = (devkit: DevkitContract) => Promise<graphToken>

const getEthPrice: GetEthPriceCaller = always(
	bent(
		THEGRAPH_UNISWAP_ENDPOINT,
		'POST',
		'json'
	)('', {
		query: `{ bundle(id: 1) { id ethPrice } }`,
		variables: null,
	}).then((r) => r as graphBundle)
)

const getDevEthPrice: GetDevEthPriceCaller = async (devkit: DevkitContract) => {
	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['token']()
	return bent(
		THEGRAPH_UNISWAP_ENDPOINT,
		'POST',
		'json'
	)('', {
		query: `{ token(id: "${devContractAddress.toLowerCase()}") { derivedETH } }`,
		variables: null,
	}).then((r) => r as graphToken)
}

const getDevPrice: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	const [{ data: ethPrice }, { data: devEthPrice }] = await Promise.all([
		getEthPrice(),
		getDevEthPrice(devkit),
	])
	const devPrice =
		ethPrice &&
		Number(ethPrice?.bundle.ethPrice) *
			Number(devEthPrice?.token?.derivedETH || '0')
	return new BigNumber(devPrice || '0')
}

const getTotalCap: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['token']()
	const totalSupply = await devkit.dev(devContractAddress).totalSupply()

	const devPrice = await getDevPrice(devkit)

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
	const totalSupply = new BigNumber(await getTotalSupply(devkit))
	const teamAmount = await devkit
		.dev(devContractAddress)
		.balanceOf(DEV_TEAM_WALLET_ADDRESS)
	const circulatingSupply = totalSupply.minus(new BigNumber(teamAmount))

	return circulatingSupply
}

const getMarketCap: (devkit: DevkitContract) => Promise<BigNumber> = async (
	devkit: DevkitContract
) => {
	// use from input parameter
	const devPrice = await getDevPrice(devkit)
	const circulatingSupply = await getCirculatingSupply(devkit)
	const marketCap = devPrice.multipliedBy(circulatingSupply)

	return toNaturalNumber(marketCap)
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

	return totalStakingAmount.div(circulatingSupply)
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

	const totalStakingAmount = await getTotalStakingAmount(devkit)

	const policyContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['policy']()
	const holdersShare = await devkit
		.policy(policyContractAddress)
		.holdersShare(maxRewards, totalStakingAmount.toFixed())

	const stakers = new BigNumber(maxRewards).minus(new BigNumber(holdersShare))
	const year = new BigNumber(2102400)
	const stakerAPY = stakers.times(year).div(totalStakingAmount)
	const creatorAPY = new BigNumber(holdersShare)
		.times(year)
		.div(totalStakingAmount)

	return { stakerAPY, creatorAPY }
}

const getTotalSupply: (devkit: DevkitContract) => Promise<string> = async (
	devkit: DevkitContract
) => {
	const devContractAddress = await devkit
		.registry(addresses.eth['main']?.registry)
		['token']()
	const totalSupply = await devkit.dev(devContractAddress).totalSupply()

	return totalSupply
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

	const totalSupply = toNaturalNumber(await getTotalSupply(devkit))

	const year = new BigNumber(2102400)
	const annualSupplyGrowthRatio = toNaturalNumber(maxRewards)
		.times(year)
		.div(totalSupply)

	return annualSupplyGrowthRatio
}

const getAssetOnboarded: () => Promise<number> = always(
	bent(
		DEV_GRAPHQL_ENDPOINT,
		'POST',
		'json'
	)('/', {
		query: `{ property_factory_create_aggregate(
			where: { authentication: { authentication_id: { _is_null: false } } }
		) { aggregate { count } } }`,
		variables: null,
	}).then(
		(r) =>
			(r as propertyFactoryCreateAggregate).data
				.property_factory_create_aggregate.aggregate.count
	)
)

const getCreatorsRewardsDev: (
	devkit: DevkitContract,
	creatorAPY: BigNumber
) => Promise<BigNumber> = async (
	devkit: DevkitContract,
	creatorAPY: BigNumber
) => {
	const totalStakingAmount = await getTotalStakingAmount(devkit)
	const creatorsRewardsDev = creatorAPY.multipliedBy(totalStakingAmount)
	return creatorsRewardsDev
}

// eslint-disable-next-line functional/functional-parameters
export const getStats: GetStatsCaller = async () => {
	const web3 = new Web3(DEV_OWN_HTTP_PROVIDER)
	const devkit = createDevkitContract(web3)

	const [
		devPrice,
		totalCap,
		marketCap,
		stakingRatio,
		stakingAmount,
		{ stakerAPY, creatorAPY },
		annualSupplyGrowthRatio,
		assetOnboarded,
	] = await Promise.all([
		getDevPrice(devkit),
		getTotalCap(devkit),
		getMarketCap(devkit),
		getStakingRatio(devkit),
		getTotalStakingAmount(devkit),
		getAPY(devkit),
		getSupplyGrowth(devkit),
		getAssetOnboarded(),
	])
	const creatorsRewardsDEV = toNaturalNumber(
		await getCreatorsRewardsDev(devkit, creatorAPY)
	)
	const creatorsRewardsUSD = devPrice.multipliedBy(creatorsRewardsDEV)

	return {
		devPrice: devPrice.toNumber(),
		totalCap: totalCap.toNumber(),
		marketCap: marketCap.toNumber(),
		stakingRatio: stakingRatio.toNumber(),
		stakingAmount: toNaturalNumber(stakingAmount).toNumber(),
		stakerAPY: stakerAPY.toNumber(),
		creatorAPY: creatorAPY.toNumber(),
		annualSupplyGrowthRatio: annualSupplyGrowthRatio.toNumber(),
		assetOnboarded: assetOnboarded,
		creatorsRewardsDEV: creatorsRewardsDEV.toNumber(),
		creatorsRewardsUSD: creatorsRewardsUSD.toNumber(),
	} as DevStats
}
