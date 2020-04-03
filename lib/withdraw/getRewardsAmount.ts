import { Contract } from 'web3-eth-contract/types'

export type CreateGetRewardsAmountCaller = (
	contract: Contract
) => (address: string) => Promise<string>

export const createGetRewardsAmountCaller: CreateGetRewardsAmountCaller = (
	contract: Contract
) => async (address: string) =>
	contract.methods
		.getRewardsAmount(address)
		.call()
		.then((result: string) => result)
