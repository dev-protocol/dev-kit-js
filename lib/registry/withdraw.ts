import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateWithdrawCaller = (contract: Contract) => () => Promise<string>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract
) => always(execute({ contract, method: 'withdraw' }))
