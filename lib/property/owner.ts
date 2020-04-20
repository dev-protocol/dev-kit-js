import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateOwnerCaller = (contract: Contract) => () => Promise<string>

export const createOwnerCaller: CreateOwnerCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'owner' })
