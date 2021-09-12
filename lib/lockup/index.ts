/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { lockupAbi } from './abi'
import { CustomOptions } from '../option'
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
import { always } from 'ramda'
import { createDepositToPropertyCaller } from './depositToProperty'
import { createDepositToPositionCaller } from './depositToPosition'
import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { createMigrateToSTokensCaller } from './migrateToSTokens'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from './calculateWithdrawableInterestAmountByPosition'

export type LockupContract = {
	readonly getValue: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly getAllValue: () => Promise<string>
	readonly getPropertyValue: (address: string) => Promise<string>
	readonly withdrawByPosition: (
		positionTokenId: string,
		amount: string
	) => Promise<boolean>
	readonly withdraw: (
		propertyAddress: string,
		amount: string
	) => Promise<boolean>
	readonly calculateWithdrawableInterestAmountByPosition: (
		positionTokenId: string
	) => Promise<string>
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
	readonly depositToProperty: (
		propertyAddress: string,
		amount: string
	) => Promise<boolean>
	readonly depositToPosition: (
		positionTokenId: string,
		amount: string
	) => Promise<boolean>
	readonly migrateToSTokens: (positionTokenId: string) => Promise<boolean>
	readonly contract: () => Contract
}

export type CreateLockupContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => LockupContract

export const createLockupContract: CreateLockupContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): LockupContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...lockupAbi],
			address,
			{
				...options,
			}
		)

		return {
			getValue: createGetValueCaller(contractClient),
			getAllValue: createGetAllValueCaller(contractClient),
			getPropertyValue: createGetPropertyValueCaller(contractClient),
			withdrawByPosition: createWithdrawByPositionCaller(
				contractClient,
				client
			),
			withdraw: createWithdrawCaller(contractClient, client),
			calculateWithdrawableInterestAmountByPosition:
				createcalculateWithdrawableInterestAmountByPositionCaller(
					contractClient
				),
			calculateWithdrawableInterestAmount:
				createCalculateWithdrawableInterestAmountCaller(contractClient),
			calculateCumulativeHoldersRewardAmount:
				createCalculateCumulativeHoldersRewardAmountCaller(contractClient),
			getStorageWithdrawalStatus:
				createGetStorageWithdrawalStatusCaller(contractClient),
			calculateCumulativeRewardPrices:
				createCalculateCumulativeRewardPricesCaller(contractClient),
			calculateRewardAmount: createCalculateRewardAmountCaller(contractClient),
			cap: createCapCaller(contractClient),
			depositToProperty: createDepositToPropertyCaller(contractClient, client),
			depositToPosition: createDepositToPositionCaller(contractClient, client),
			migrateToSTokens: createMigrateToSTokensCaller(contractClient, client),
			contract: always(contractClient),
		}
	}
