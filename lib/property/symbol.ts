import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateSymbolCaller = (contract: Contract) => () => Promise<string>

export const createSymbolCaller: CreateSymbolCaller = (contract: Contract) =>
	always(execute({ contract, method: 'symbol' }))
