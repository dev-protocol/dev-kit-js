import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateWithdrawCaller = (contract: Contract) => () => Promise<string>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'withdraw' })
