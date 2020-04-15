import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateTransferCaller = (
	contract: Contract,
	client: Web3
) => (to: string, value: string) => Promise<boolean>

export const createTransferCaller: CreateTransferCaller = (
	contract: Contract,
	client: Web3
) => async (to: string, value: string) =>
	contract.methods
		.transfer([to, value])
		.send({ from: await getAccount(client) })
		.then((result: boolean) => result)
