import { ContractRunner, ethers } from 'ethers'
import type { TransactionResponse } from 'ethers'
import { withdrawAbi } from './abi'
import { FallbackableOverrides } from '../../common/utils/execute'
import { createWithdrawCaller } from '../../ethereum/withdraw/withdraw'
import {
	calculateRewardAmountCaller,
	HolderRewards,
} from './calculateRewardAmount'
import { TransferHistory, transferHistoryCaller } from './transferHistory'
import { transferHistoryLengthCaller } from './transferHistoryLength'
import { transferHistoryLengthOfRecipientCaller } from './transferHistoryLengthOfRecipient'
import { transferHistoryLengthOfSenderCaller } from './transferHistoryLengthOfSender'
import { transferHistoryOfRecipientByIndexCaller } from './transferHistoryOfRecipientByIndex'
import { transferHistoryOfSenderByIndexCaller } from './transferHistoryOfSenderByIndex'

export type WithdrawContract = {
	readonly withdraw: (
		propertyAddress: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly calculateRewardAmount: (
		propertyAddress: string,
		accountAddress: string,
	) => Promise<HolderRewards>
	readonly transferHistory: (
		propertyAddress: string,
		index: number | string,
	) => Promise<TransferHistory>
	readonly transferHistoryLength: (propertyAddress: string) => Promise<string>
	readonly transferHistoryLengthOfRecipient: (
		propertyAddress: string,
		recipient: string,
	) => Promise<string>
	readonly transferHistoryLengthOfSender: (
		propertyAddress: string,
		sender: string,
	) => Promise<string>
	readonly transferHistoryOfRecipientByIndex: (
		propertyAddress: string,
		recipient: string,
		index: number | string,
	) => Promise<string>
	readonly transferHistoryOfSenderByIndex: (
		propertyAddress: string,
		sender: string,
		index: number | string,
	) => Promise<string>

	readonly contract: () => ethers.Contract
}

export const createWithdrawContract =
	(provider: ContractRunner) =>
	(address: string): WithdrawContract => {
		const contract = new ethers.Contract(address, [...withdrawAbi], provider)

		return {
			withdraw: createWithdrawCaller(contract),
			calculateRewardAmount: calculateRewardAmountCaller(contract),
			transferHistory: transferHistoryCaller(contract),
			transferHistoryLength: transferHistoryLengthCaller(contract),
			transferHistoryLengthOfRecipient:
				transferHistoryLengthOfRecipientCaller(contract),
			transferHistoryLengthOfSender:
				transferHistoryLengthOfSenderCaller(contract),
			transferHistoryOfRecipientByIndex:
				transferHistoryOfRecipientByIndexCaller(contract),
			transferHistoryOfSenderByIndex:
				transferHistoryOfSenderByIndexCaller(contract),
			contract: () => contract,
		}
	}

export { HolderRewards } from './calculateRewardAmount'
export { TransferHistory }
