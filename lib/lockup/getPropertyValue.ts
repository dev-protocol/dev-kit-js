import { Contract } from 'web3-eth-contract/types'

export type CreateGetPropertyValueCaller = (
	contract: Contract
) => (address: string) => Promise<string>

export const createGetPropertyValueCaller: CreateGetPropertyValueCaller = (
	contract: Contract
) => async (address: string) =>
	contract.methods
		.getPropertyValue(address)
		.call()
		.then((result: string) => result)
