import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateTokenCaller = (contract: Contract) => () => Promise<string>

export const createTokenCaller: CreateTokenCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'token' })
