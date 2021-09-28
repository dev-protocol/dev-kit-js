/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { withdrawAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createWithdrawCaller } from './withdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'
import { createBulkWithdrawCaller } from './bulkWithdraw'
import { TxReceipt } from '../../common/utils/web3-txs'
import { always } from 'ramda'
import { calculateRewardAmountCaller } from './calculateRewardAmount'

export type WithdrawContract = {
	readonly withdraw: (propertyAddress: string) => Promise<boolean>
	readonly bulkWithdraw: (
		propertyAddresses: readonly string[]
	) => Promise<TxReceipt>
	readonly getRewardsAmount: (propertyAddress: string) => Promise<string>
	readonly calculateWithdrawableAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly calculateRewardAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<readonly [string, string, string, string]>
	readonly contract: () => Contract
}

export type CreateWithdrawContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => WithdrawContract

export const createWithdrawContract: CreateWithdrawContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): WithdrawContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...withdrawAbi],
			address,
			{
				...options,
			}
		)

		return {
			withdraw: createWithdrawCaller(contractClient, client),
			bulkWithdraw: createBulkWithdrawCaller(contractClient, client),
			getRewardsAmount: createGetRewardsAmountCaller(contractClient),
			calculateWithdrawableAmount:
				createCalculateWithdrawableAmountCaller(contractClient),
			calculateRewardAmount: calculateRewardAmountCaller(contractClient),
			contract: always(contractClient),
		}
	}
