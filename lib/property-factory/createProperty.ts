import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'

export type CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => (name: string, symbol: string) => Promise<string>

export const createCreatePropertyCaller: CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => async (name: string, symbol: string) =>
	execute<string>({
		contract,
		method: 'createProperty',
		args: [name, symbol],
		mutation: true,
		client,
	})
