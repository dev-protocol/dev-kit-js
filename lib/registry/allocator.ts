/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateAllocatorCaller = (
	contract: Contract
) => () => Promise<string>

export const createAllocatorCaller: CreateAllocatorCaller = (
	contract: Contract
) => always(execute({ contract, method: 'allocator' }))
