import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreatePolicyGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createPolicyGroupCaller: CreatePolicyGroupCaller = (
	contract: Contract
) => always(execute({ contract, method: 'policyGroup' }))
