import { Contract } from 'web3-eth-contract/types'

export type CreateAllocatorStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createAllocatorStorageCaller: CreateAllocatorStorageCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.allocatorStorage()
		.call()
		.then((result: string) => result)
