import Contract from 'web3/eth/contract'

export const createCreateProperty = (contract: Contract) => async (
	name: string,
	symbol: string
) =>
	contract.methods
		.createProperty([name, symbol])
		.call()
		.then(result => result as string)
