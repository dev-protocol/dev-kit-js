import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { lockupAbi } from './abi'
import { createGetValueCaller } from './getValue'
import { createGetPropertyValueCaller } from './getPropertyValue'
import { createWithdrawCaller } from './withdraw'
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from './calculateRewardAmount'
import { createCapCaller } from './cap'

export type LockupContract = {
	readonly getValue: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly getAllValue: () => Promise<string>
	readonly getPropertyValue: (address: string) => Promise<string>
	readonly withdraw: (
		propertyAddress: string,
		amount: string
	) => Promise<boolean>
	readonly calculateWithdrawableInterestAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly calculateCumulativeHoldersRewardAmount: (
		propertyAddress: string
	) => Promise<string>
	readonly getStorageWithdrawalStatus: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly calculateCumulativeRewardPrices: () => Promise<
		readonly [string, string, string, string]
	>
	readonly calculateRewardAmount: (
		propertyAddress: string
	) => Promise<readonly [string, string]>
	readonly cap: () => Promise<string>
}

export const createLockupContract =
	(provider: Provider | Signer) =>
	(address: string): LockupContract => {
		const contract = new ethers.Contract(address, [...lockupAbi], provider)

		return {
			getValue: createGetValueCaller(contract),
			getAllValue: createGetAllValueCaller(contract),
			getPropertyValue: createGetPropertyValueCaller(contract),
			withdraw: createWithdrawCaller(contract),
			calculateWithdrawableInterestAmount:
				createCalculateWithdrawableInterestAmountCaller(contract),
			calculateCumulativeHoldersRewardAmount:
				createCalculateCumulativeHoldersRewardAmountCaller(contract),
			getStorageWithdrawalStatus:
				createGetStorageWithdrawalStatusCaller(contract),
			calculateCumulativeRewardPrices:
				createCalculateCumulativeRewardPricesCaller(contract),
			calculateRewardAmount: createCalculateRewardAmountCaller(contract),
			cap: createCapCaller(contract),
		}
	}
