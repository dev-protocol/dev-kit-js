import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { TxReceipt } from '../utils/web3-txs'

export type CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => (name: string, symbol: string, author: string) => Promise<TxReceipt>

export const createCreatePropertyCaller: CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => async (name: string, symbol: string, author: string) =>
	execute({
		contract,
		method: 'createProperty',
		args: [name, symbol, author],
		mutation: true,
		client,
	})
