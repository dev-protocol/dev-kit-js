import Contract from 'web3/eth/contract'

export const createBaseSchemaCaller = async (
	contract: Contract
): Promise<string> => contract.methods.schema().call()

export const createSchemaCaller = (
	contract: Contract
): (() => Promise<string[]>) => async () =>
	createBaseSchemaCaller(contract).then(
		result => JSON.parse(result) as string[]
	)
