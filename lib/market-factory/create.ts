/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateCreateCaller = (
	contract: Contract,
	client: Web3
) => (marketBehaviorAddress: string) => Promise<boolean>

export const createCreateCaller: CreateCreateCaller =
	(contract: Contract, client: Web3) => async (marketBehaviorAddress: string) =>
		execute({
			contract,
			method: 'create',
			mutation: true,
			client,
			args: [marketBehaviorAddress],
		}).then(T)
