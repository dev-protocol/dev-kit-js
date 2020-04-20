import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetAllValueCaller = (
	contract: Contract
) => () => Promise<string>

export const createGetAllValueCaller: CreateGetAllValueCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'getAllValue' })
