import { ethers } from 'ethers'
import { contractFactory, addresses } from '@devprotocol/dev-kit'

// use main net
const registryContractAddress = addresses.eth.main.registry
const provider = new ethers.providers.JsonRpcProvider(
	process.env.WEB3_PROVIDER_URL,
)
const contract = contractFactory(provider)
const propertyAddress = '0xac1AC9d00314aE7B4a7d6DbEE4860bECedF92309'
const lockupContractAddress = await contract
	.registry(registryContractAddress)
	.lockup()

const propertyStakingAmount = await contract
	.lockup(lockupContractAddress)
	.getPropertyValue(propertyAddress)
const stakingAmount = ethers.BigNumber.from(propertyStakingAmount).div(
	new ethers.BigNumber.from(10).pow(18),
)
console.log(
	`${propertyAddress}'s staking amount is ${stakingAmount.toBigInt()} DEV`,
)

const propertyRewards = await contract
	.lockup(lockupContractAddress)
	.calculateRewardAmount(propertyAddress)
const reward = ethers.BigNumber.from(propertyRewards[0]).div(
	new ethers.BigNumber.from(10).pow(36),
)
console.log(`${propertyAddress}'s rewards is ${reward.toBigInt()} DEV`)
