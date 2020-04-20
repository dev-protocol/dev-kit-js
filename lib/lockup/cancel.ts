import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'

export type CreateCancelCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string) => Promise<true>

export const createCancelCaller: CreateCancelCaller = (
	contract: Contract,
	client: Web3
) => async (propertyAddress: string) =>
	execute({
		contract,
		method: 'cancel',
		mutation: true,
		client,
		args: [propertyAddress],
	}).then(() => true)
