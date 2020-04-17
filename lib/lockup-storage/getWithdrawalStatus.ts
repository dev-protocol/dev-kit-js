import { Contract } from 'web3-eth-contract/types'

export type CreateGetWithdrawalStatusCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetWithdrawalStatusCaller: CreateGetWithdrawalStatusCaller = (
	contract: Contract
) => async (propertyAddress: string, accountAddress: string) =>
	contract.methods
		.getWithdrawalStatus(propertyAddress, accountAddress)
		.call()
		.then((result: string) => result)
