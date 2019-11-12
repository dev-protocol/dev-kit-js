import Contract from 'web3/eth/contract'

export const createOwnerCaller = (contract: Contract) => async () =>
	contract.methods
		.owner()
		.call()
		.then(result => result as string)
