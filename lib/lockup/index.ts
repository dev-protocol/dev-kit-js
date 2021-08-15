import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { lockupAbi } from './abi'
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

export const createLockupContract = (provider: Provider | Signer) => (
	address: string
): LockupContract => {
	const contractClient = new ethers.Contract(address, [...lockupAbi], provider)
	return {
		getValue: createGetValueCaller(contractClient),
		getAllValue: createGetAllValueCaller(contractClient),
		getPropertyValue: createGetPropertyValueCaller(contractClient),
		cancel: createCancelCaller(contractClient),
		withdraw: createWithdrawCaller(contractClient),
		withdrawInterest: createWithdrawInterestCaller(contractClient),
		calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(
			contractClient
		),
		getStorageWithdrawalStatus: createGetStorageWithdrawalStatusCaller(
			contractClient
		),
	}
}
