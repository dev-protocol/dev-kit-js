import Contract from 'web3/eth/contract'

export const createSchemaCaller = (
	contract: Contract
): (() => Promise<string[]>) => async () =>
	contract.methods
		.schema()
		.call()
		.then(result => JSON.parse(result) as string[])
