import Contract from 'web3/eth/contract'

export const createTransferCaller = (contract: Contract) => async (
	to: string,
	value: number
) =>
	contract.methods
		.transfer([to, value])
		.call()
		.then(result => result as boolean)
