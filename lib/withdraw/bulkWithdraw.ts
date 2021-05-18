/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { TxReceipt } from '../utils/web3-txs'

export type CreateBulkWithdrawCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddresses: readonly string[]) => Promise<TxReceipt>

export const createBulkWithdrawCaller: CreateBulkWithdrawCaller =
	(contract: Contract, client: Web3) =>
	async (propertyAddresses): Promise<TxReceipt> =>
		execute({
			contract,
			method: 'bulkWithdraw',
			mutation: true,
			client,
			args: [propertyAddresses],
		})
