import Contract from 'web3/eth/contract'

export const createCreatePropertyCaller = (contract: Contract) => async (
	name: string,
	symbol: string
) =>
	contract.methods
		.createProperty([name, symbol])
		.call()
		.then(result => result as string)
