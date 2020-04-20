import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePropertyFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createPropertyFactoryCaller: CreatePropertyFactoryCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'propertyFactory' })
