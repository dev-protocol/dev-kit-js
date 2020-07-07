import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreatePolicySetCaller = (
	contract: Contract
) => () => Promise<string>

export const createPolicySetCaller: CreatePolicySetCaller = (
	contract: Contract
) => always(execute({ contract, method: 'policySet' }))
