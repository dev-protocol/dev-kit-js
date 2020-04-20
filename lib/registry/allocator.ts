import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateAllocatorCaller = (
	contract: Contract
) => () => Promise<string>

export const createAllocatorCaller: CreateAllocatorCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'allocator' })
