import Contract from 'web3/eth/contract'

export type CreateAllocateCaller = (
	contract: Contract
) => (address: string) => Promise<void>

export const createAllocateCaller: CreateAllocateCaller = (
	contract: Contract
) => async (address: string) =>
	contract.methods
		.allocate([address])
		.call()
		.then(result => result as void)
