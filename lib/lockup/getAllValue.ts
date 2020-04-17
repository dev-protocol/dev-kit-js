import { Contract } from 'web3-eth-contract/types'

export type CreateGetAllValueCaller = (
	contract: Contract
) => () => Promise<string>

export const createGetAllValueCaller: CreateGetAllValueCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.getAllValue()
		.call()
		.then((result: string) => result)
