import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateTransferFromCaller = (
	contract: Contract,
	client: Web3
) => (from: string, to: string, value: string) => Promise<boolean>

export const createTransferFromCaller: CreateTransferFromCaller = (
	contract: Contract,
	client: Web3
) => async (from: string, to: string, value: string) =>
	execute({
		contract,
		method: 'transferFrom',
		mutation: true,
		client,
		args: [from, to, value],
	}).then(T)
