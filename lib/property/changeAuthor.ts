import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateChangeAuthorCaller = (
	contract: Contract,
	client: Web3
) => (nextOwther: string) => Promise<boolean>

export const createChangeAuthorCaller: CreateChangeAuthorCaller = (
	contract: Contract,
	client: Web3
) => async (nextOwther: string) =>
	execute({
		contract,
		method: 'changeAuthor',
		mutation: true,
		client,
		args: [nextOwther],
	}).then(T)
