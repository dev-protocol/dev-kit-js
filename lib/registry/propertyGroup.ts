import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePropertyGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createPropertyGroupCaller: CreatePropertyGroupCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'propertyGroup' })
