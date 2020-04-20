import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateWithdrawStorageCaller = (
	contract: Contract
) => () => Promise<string>

export const createWithdrawStorageCaller: CreateWithdrawStorageCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'withdrawStorage' })
