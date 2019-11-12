import Contract from 'web3/eth/contract'

export const createAllocateCaller = (contract: Contract) => async (
	address: string
) =>
	contract.methods
		.allocate([address])
		.call()
		.then(result => result as void)
