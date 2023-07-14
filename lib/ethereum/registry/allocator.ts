import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateAllocatorCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createAllocatorCaller: CreateAllocatorCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'allocator',
			mutation: false,
		}),
	)
