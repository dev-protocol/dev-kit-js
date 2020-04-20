import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateAllocatorStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createAllocatorStorageCaller: CreateAllocatorStorageCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'allocatorStorage' })
