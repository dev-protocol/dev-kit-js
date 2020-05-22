import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreatePolicyCaller = (contract: Contract) => () => Promise<string>

export const createPolicyCaller: CreatePolicyCaller = (contract: Contract) =>
	always(execute({ contract, method: 'policy' }))
