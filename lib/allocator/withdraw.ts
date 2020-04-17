import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { getAccount } from '../utils/getAccount'

export type CreateWithdrawCaller = (
	contract: Contract,
	client: Web3
) => (address: string) => Promise<void>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract,
	client: Web3
) => async (address: string) =>
	contract.methods
		.withdraw(address)
		.send({ from: await getAccount(client) })
		.then((result: void) => result)
