import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateWithdrawCaller = (
	contract: Contract,
	client: Web3
) => (address: string) => Promise<void>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: Contract,
	client: Web3
) => async (address: string) =>
	execute({
		contract,
		method: 'withdraw',
		mutation: true,
		client,
		args: [address],
	})
