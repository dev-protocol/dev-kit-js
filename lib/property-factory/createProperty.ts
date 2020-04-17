import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => (name: string, symbol: string) => Promise<string>

export const createCreatePropertyCaller: CreateCreatePropertyCaller = (
	contract: Contract,
	client: Web3
) => async (name: string, symbol: string) =>
	contract.methods
		.createProperty(name, symbol)
		.send({ from: await getAccount(client) })
		.then((result: string) => result)
