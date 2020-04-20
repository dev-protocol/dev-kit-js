import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePolicyFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createPolicyFactoryCaller: CreatePolicyFactoryCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'policyFactory' })
