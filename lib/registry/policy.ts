import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePolicyCaller = (contract: Contract) => () => Promise<string>

export const createPolicyCaller: CreatePolicyCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'policy' })
