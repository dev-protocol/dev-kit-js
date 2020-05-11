import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'

export type CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => (name: string, symbol: string, author: string) => Promise<string>

export const createCreatePropertyCaller: CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => async (name: string, symbol: string, author: string): Promise<string> =>
	execute({
		contract,
		method: 'createProperty',
		args: [name, symbol, author],
		mutation: true,
		client,
	}).then(({ events }) => events.Create.returnValues._property as string)
