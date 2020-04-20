import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateLockupCaller = (contract: Contract) => () => Promise<string>

export const createLockupCaller: CreateLockupCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'lockup' })
