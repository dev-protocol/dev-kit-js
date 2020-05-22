import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateOwnerCaller = (contract: Contract) => () => Promise<string>

export const createOwnerCaller: CreateOwnerCaller = (contract: Contract) =>
	always(execute({ contract, method: 'owner' }))
