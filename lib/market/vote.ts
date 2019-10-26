import Contract from 'web3/eth/contract'

export const createVoteCaller = (
	contract: Contract
): ((tokenNumber: string) => Promise<void>) => async (tokenNumber: string) =>
	contract.methods
		.vote([tokenNumber])
		.call()
		.then(() => {})
