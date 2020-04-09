import { Contract } from 'web3-eth-contract/types'

export type CreatePropertyGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createPropertyGroupCaller: CreatePropertyGroupCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.propertyGroup()
		.call()
		.then((result: string) => result)
