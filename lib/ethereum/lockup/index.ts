import { ContractRunner, ethers } from 'ethers'
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
import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from './calculateWithdrawableInterestAmountByPosition'
import { createDepositToPropertyCaller } from './depositToProperty'
import { createDepositToPositionCaller } from './depositToPosition'
import { createMigrateToSTokensCaller } from './migrateToSTokens'
import { FallbackableOverrides } from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type LockupContract = {
	readonly getValue: (
		propertyAddress: string,
		accountAddress: string,
	) => Promise<string>
	readonly getAllValue: () => Promise<string>
	readonly getPropertyValue: (address: string) => Promise<string>
	readonly withdrawByPosition: (
		positionTokenId: string,
		amount: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly withdraw: (
		propertyAddress: string,
		amount: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly calculateWithdrawableInterestAmountByPosition: (
		positionTokenId: string,
	) => Promise<string>
	readonly calculateWithdrawableInterestAmount: (
		propertyAddress: string,
		accountAddress: string,
	) => Promise<string>
	readonly calculateCumulativeHoldersRewardAmount: (
		propertyAddress: string,
	) => Promise<string>
	readonly getStorageWithdrawalStatus: (
		propertyAddress: string,
		accountAddress: string,
	) => Promise<string>
	readonly calculateCumulativeRewardPrices: () => Promise<
		readonly [string, string, string, string]
	>
	readonly calculateRewardAmount: (
		propertyAddress: string,
	) => Promise<readonly [string, string]>
	readonly cap: () => Promise<string>
	readonly depositToProperty: (
		propertyAddress: string,
		amount: string,
		payload?: string | Uint8Array,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly depositToPosition: (
		positionTokenId: string,
		amount: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly migrateToSTokens: (
		positionTokenId: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createLockupContract =
	(provider: ContractRunner) =>
	(address: string): LockupContract => {
		const contract = new ethers.Contract(address, [...lockupAbi], provider)

		return {
			getValue: createGetValueCaller(contract),
			getAllValue: createGetAllValueCaller(contract),
			getPropertyValue: createGetPropertyValueCaller(contract),
			withdrawByPosition: createWithdrawByPositionCaller(contract),
			withdraw: createWithdrawCaller(contract),
			calculateWithdrawableInterestAmountByPosition:
				createcalculateWithdrawableInterestAmountByPositionCaller(contract),
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
			depositToProperty: createDepositToPropertyCaller(contract),
			depositToPosition: createDepositToPositionCaller(contract),
			migrateToSTokens: createMigrateToSTokensCaller(contract),
			contract: () => contract,
		}
	}
