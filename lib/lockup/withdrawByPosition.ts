/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateWithdrawByPositionCaller = (
	contract: Contract,
	client: Web3
) => (positionTokenId: string, amount: string) => Promise<boolean>

export const createWithdrawByPositionCaller: CreateWithdrawByPositionCaller =
	(contract: Contract, client: Web3) =>
	async (positionTokenId: string, amount: string) =>
		execute({
			contract,
			method: 'withdrawByPosition',
			mutation: true,
			client,
			args: [positionTokenId, amount],
		}).then(T)
