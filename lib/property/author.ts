import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateAuthorCaller = (contract: Contract) => () => Promise<string>

export const createAuthorCaller: CreateAuthorCaller = (contract: Contract) =>
	always(execute({ contract, method: 'author' }))
