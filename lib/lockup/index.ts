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

export interface LockupContract {
	getValue: (propertyAddress: string, accountAddress: string) => Promise<string>
	getAllValue: () => Promise<string>
	getPropertyValue: (address: string) => Promise<string>
	cancel: (propertyAddress: string) => Promise<true>
	withdraw: (propertyAddress: string) => Promise<true>
	withdrawInterest: (propertyAddress: string) => Promise<true>
	calculateWithdrawableInterestAmount: (
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
	const contractClient: Contract = new client.eth.Contract(lockupAbi, address, {
		...options
	})

	return {
		getValue: createGetValueCaller(contractClient),
		getAllValue: createGetAllValueCaller(contractClient),
		getPropertyValue: createGetPropertyValueCaller(contractClient),
		cancel: createCancelCaller(contractClient, client),
		withdraw: createWithdrawCaller(contractClient, client),
		withdrawInterest: createWithdrawInterestCaller(contractClient, client),
		calculateWithdrawableInterestAmount: createCalculateWithdrawableInterestAmountCaller(
			contractClient
		)
	}
}
