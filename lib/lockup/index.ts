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
import { always } from 'ramda'

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
	readonly contract: () => Contract
}

export type CreateLockupContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => LockupContract

export const createLockupContract: CreateLockupContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): LockupContract => {
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
		withdraw: createWithdrawCaller(contractClient, client),
		calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(
			contractClient
		),
		calculateCumulativeHoldersRewardAmount: createCalculateCumulativeHoldersRewardAmountCaller(
			contractClient
		),
		getStorageWithdrawalStatus: createGetStorageWithdrawalStatusCaller(
			contractClient
		),
		contract: always(contractClient),
	}
}
