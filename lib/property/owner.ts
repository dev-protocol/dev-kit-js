import { Contract } from 'web3-eth-contract/types'

export type CreateOwnerCaller = (contract: Contract) => () => Promise<string>

export const createOwnerCaller: CreateOwnerCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.owner()
		.call()
		.then((result: string) => result)
