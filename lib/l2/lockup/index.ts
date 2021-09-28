/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { lockupAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'
import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices'
import { createCalculateRewardAmountCaller } from './calculateRewardAmount'
import { createCapCaller } from './cap'
import { always } from 'ramda'
import { createDepositToPropertyCaller } from './depositToProperty'
import { createDepositToPositionCaller } from './depositToPosition'
import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { createcalculateWithdrawableInterestAmountByPositionCaller } from './calculateWithdrawableInterestAmountByPosition'
import { createTotalLockedCaller } from './totalLocked'
import { createTotalLockedForPropertyCaller } from './totalLockedForProperty'

export type LockupContract = {
	readonly withdrawByPosition: (
		positionTokenId: string,
		amount: string
	) => Promise<boolean>
	readonly calculateWithdrawableInterestAmountByPosition: (
		positionTokenId: string
	) => Promise<string>
	readonly calculateCumulativeHoldersRewardAmount: (
		propertyAddress: string
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
	readonly totalLocked: () => Promise<string>
	readonly totalLockedForProperty: (address: string) => Promise<string>
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
			withdrawByPosition: createWithdrawByPositionCaller(
				contractClient,
				client
			),
			calculateWithdrawableInterestAmountByPosition:
				createcalculateWithdrawableInterestAmountByPositionCaller(
					contractClient
				),
			calculateCumulativeHoldersRewardAmount:
				createCalculateCumulativeHoldersRewardAmountCaller(contractClient),
			calculateCumulativeRewardPrices:
				createCalculateCumulativeRewardPricesCaller(contractClient),
			calculateRewardAmount: createCalculateRewardAmountCaller(contractClient),
			cap: createCapCaller(contractClient),
			depositToProperty: createDepositToPropertyCaller(contractClient, client),
			depositToPosition: createDepositToPositionCaller(contractClient, client),
			totalLocked: createTotalLockedCaller(contractClient),
			totalLockedForProperty:
				createTotalLockedForPropertyCaller(contractClient),
			contract: always(contractClient),
		}
	}
