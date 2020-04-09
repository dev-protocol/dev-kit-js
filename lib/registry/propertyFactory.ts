import { Contract } from 'web3-eth-contract/types'

export type CreatePropertyFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createPropertyFactoryCaller: CreatePropertyFactoryCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.propertyFactory()
		.call()
		.then((result: string) => result)
