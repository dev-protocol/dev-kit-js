/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { TxReceipt } from '../utils/web3-txs'

export type CreateUpdateCapCaller = (
	contract: Contract,
	client: Web3
) => (geometricMean: string) => Promise<TxReceipt>

export const createUpdateCapCaller: CreateUpdateCapCaller = (
	contract: Contract,
	client: Web3
): ((geometricMean: string) => Promise<TxReceipt>) => async (
	geometricMean: string
): Promise<TxReceipt> =>
	execute({
		contract,
		method: 'updateCap',
		mutation: true,
		client,
		args: [geometricMean],
	})
