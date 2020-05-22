import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateGetAllValueCaller = (
	contract: Contract
) => () => Promise<string>

export const createGetAllValueCaller: CreateGetAllValueCaller = (
	contract: Contract
) => always(execute({ contract, method: 'getAllValue' }))
