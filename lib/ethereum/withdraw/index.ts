import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { withdrawAbi } from './abi'
import { createWithdrawCaller } from './withdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'
import { createBulkWithdrawCaller } from './bulkWithdraw'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { calculateRewardAmountCaller } from './calculateRewardAmount'
import { FallbackableOverrides } from '../../common/utils/execute'

export type WithdrawContract = {
	readonly withdraw: (
		propertyAddress: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
	readonly bulkWithdraw: (
		propertyAddresses: readonly string[]
	) => Promise<TransactionResponse>
	readonly getRewardsAmount: (propertyAddress: string) => Promise<string>
	readonly calculateWithdrawableAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly calculateRewardAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
}

export const createWithdrawContract =
	(provider: Provider | Signer) =>
	(address: string): WithdrawContract => {
		const contract = new ethers.Contract(address, [...withdrawAbi], provider)

		return {
			withdraw: createWithdrawCaller(contract),
			bulkWithdraw: createBulkWithdrawCaller(contract),
			getRewardsAmount: createGetRewardsAmountCaller(contract),
			calculateWithdrawableAmount:
				createCalculateWithdrawableAmountCaller(contract),
			calculateRewardAmount: calculateRewardAmountCaller(contract),
		}
	}
