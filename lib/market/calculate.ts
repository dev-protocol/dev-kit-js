import Contract from 'web3/eth/contract'

export const createCalculateCaller = (
	contract: Contract
): ((
	metrics: string,
	start: string,
	end: string
) => Promise<boolean>) => async (metrics: string, start: string, end: string) =>
	contract.methods
		.calculate([metrics, start, end])
		.call()
		.then(result => result as boolean)
