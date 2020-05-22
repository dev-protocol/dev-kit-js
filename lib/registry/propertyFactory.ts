import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreatePropertyFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createPropertyFactoryCaller: CreatePropertyFactoryCaller = (
	contract: Contract
) => always(execute({ contract, method: 'propertyFactory' }))
