/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateChangeAuthorCaller = (
	contract: Contract,
	client: Web3
) => (nextAuther: string) => Promise<boolean>

export const createChangeAuthorCaller: CreateChangeAuthorCaller =
	(contract: Contract, client: Web3) => async (nextAuther: string) =>
		execute({
			contract,
			method: 'changeAuthor',
			mutation: true,
			client,
			args: [nextAuther],
		}).then(T)
