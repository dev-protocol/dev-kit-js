/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateDepositCaller = (
	contract: Contract,
	client: Web3
) => (to: string, value: string) => Promise<boolean>

export const createDepositCaller: CreateDepositCaller =
	(contract: Contract, client: Web3) => async (to: string, value: string) =>
		execute({
			contract,
			method: 'deposit',
			mutation: true,
			client,
			args: [to, value],
		}).then(T)
