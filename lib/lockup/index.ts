import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { lockupAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetValueCaller } from './getValue'
import { createGetPropertyValueCaller } from './getPropertyValue'
import { createCancelCaller } from './cancel'
import { createWithdrawCaller } from './withdraw'
import { createWithdrawInterestCaller } from './withdrawInterest'
import { createCalculateWithdrawableInterestAmountCaller } from './calculateWithdrawableInterestAmount'
import { createGetAllValueCaller } from './getAllValue'
import { createGetStorageWithdrawalStatusCaller } from './getStorageWithdrawalStatus'

export type LockupContract = {
	readonly getValue: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly getAllValue: () => Promise<string>
	readonly getPropertyValue: (address: string) => Promise<string>
	readonly cancel: (propertyAddress: string) => Promise<boolean>
	readonly withdraw: (propertyAddress: string) => Promise<boolean>
	readonly withdrawInterest: (propertyAddress: string) => Promise<boolean>
	readonly calculateWithdrawableInterestAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
	readonly getStorageWithdrawalStatus: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
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
		cancel: createCancelCaller(contractClient, client),
		withdraw: createWithdrawCaller(contractClient, client),
		withdrawInterest: createWithdrawInterestCaller(contractClient, client),
		calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(
			contractClient
		),
		getStorageWithdrawalStatus: createGetStorageWithdrawalStatusCaller(
			contractClient
		),
	}
}
