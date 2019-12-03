import Contract from 'web3/eth/contract'

export type CreateOwnerCaller = (contract: Contract) => () => Promise<string>

export const createOwnerCaller: CreateOwnerCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.owner()
		.call()
		.then(result => result as string)
