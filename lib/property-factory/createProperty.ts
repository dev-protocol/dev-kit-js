import { Contract } from 'web3-eth-contract/types'

export type CreateCreatePropertyCaller = (
	contract: Contract
) => (name: string, symbol: string) => Promise<string>

export const createCreatePropertyCaller: CreateCreatePropertyCaller = (
	contract: Contract
) => async (name: string, symbol: string) =>
	contract.methods
		.createProperty([name, symbol])
		.call()
		.then((result: string) => result)
