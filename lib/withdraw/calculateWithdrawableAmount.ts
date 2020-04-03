import { Contract } from 'web3-eth-contract/types'

export type CreateCalculateWithdrawableAmountCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createCalculateWithdrawableAmountCaller: CreateCalculateWithdrawableAmountCaller = (
	contract: Contract
) => async (propertyAddress: string, accountAddress: string) =>
	contract.methods
		.calculateWithdrawableAmount(propertyAddress, accountAddress)
		.call()
		.then((result: string) => result)
