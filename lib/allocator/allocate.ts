import { Contract } from 'web3-eth-contract/types'

export type CreateAllocateCaller = (
	contract: Contract
) => (address: string) => Promise<void>

export const createAllocateCaller: CreateAllocateCaller = (
	contract: Contract
) => async (address: string) =>
	contract.methods
		.allocate([address])
		.send()
		.then((result: void) => result)
