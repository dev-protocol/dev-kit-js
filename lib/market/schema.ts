import Contract from 'web3/eth/contract'

export type CreateSchemaCaller = (contract: Contract) => () => Promise<string[]>

export const createSchemaCaller: CreateSchemaCaller = (
	contract: Contract
): (() => Promise<string[]>) => async () =>
	contract.methods
		.schema()
		.call()
		.then(result => JSON.parse(result) as string[])
