import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateLockupStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createLockupStorageCaller: CreateLockupStorageCaller = (
	contract: Contract
) => always(execute({ contract, method: 'lockupStorage' }))
