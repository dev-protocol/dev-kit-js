import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateDepositCaller = (
	contract: Contract,
	client: Web3
) => (to: string, value: string) => Promise<boolean>

export const createDepositCaller: CreateDepositCaller = (
	contract: Contract,
	client: Web3
) => async (to: string, value: string) =>
	contract.methods
		.deposit(to, value)
		.send({ from: await getAccount(client) })
		.then((result: boolean) => result)
