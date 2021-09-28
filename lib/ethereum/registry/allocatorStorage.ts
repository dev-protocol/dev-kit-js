/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateAllocatorStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createAllocatorStorageCaller: CreateAllocatorStorageCaller = (
	contract: Contract
) => always(execute({ contract, method: 'allocatorStorage' }))
