import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateDecimalsCaller = (contract: Contract) => () => Promise<string>

export const createDecimalsCaller: CreateDecimalsCaller = (
	contract: Contract
) => always(execute({ contract, method: 'decimals' }))
