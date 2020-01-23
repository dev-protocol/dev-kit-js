import { Contract } from 'web3-eth-contract/types'

export type CreateGetValueCaller = (
	contract: Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetValueCaller: CreateGetValueCaller = (
	contract: Contract
) => async (propertyAddress: string, accountAddress: string) =>
	contract.methods
		.getValue(propertyAddress, accountAddress)
		.call()
		.then((result: string) => result)
