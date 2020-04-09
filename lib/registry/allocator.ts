import { Contract } from 'web3-eth-contract/types'

export type CreateAllocatorCaller = (
	contract: Contract
) => () => Promise<string>

export const createAllocatorCaller: CreateAllocatorCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.allocator()
		.call()
		.then((result: string) => result)
