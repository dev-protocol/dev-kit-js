/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateChangeNameCaller = (
	contract: Contract,
	client: Web3
) => (nextAuther: string) => Promise<boolean>

export const createChangeNameCaller: CreateChangeNameCaller =
	(contract: Contract, client: Web3) => async (nextName: string) =>
		execute({
			contract,
			method: 'changeName',
			mutation: true,
			client,
			args: [nextName],
		}).then(T)
