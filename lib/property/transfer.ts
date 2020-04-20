import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'

export type CreateTransferCaller = (
	contract: Contract,
	client: Web3
) => (to: string, value: string) => Promise<boolean>

export const createTransferCaller: CreateTransferCaller = (
	contract: Contract,
	client: Web3
) => async (to: string, value: string) =>
	execute({
		contract,
		method: 'transfer',
		mutation: true,
		client,
		args: [to, value],
	}).then(() => true)
