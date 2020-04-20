import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateLockupStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createLockupStorageCaller: CreateLockupStorageCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'lockupStorage' })
