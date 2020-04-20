import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { lockupStorageAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetWithdrawalStatusCaller } from './getWithdrawalStatus'

export interface LockupStorageContract {
	getWithdrawalStatus: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
}

export type CreateLockupStorageContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => LockupStorageContract

export const createLockupStorageContract: CreateLockupStorageContract = (
	client: Web3
) => (address?: string, options?: CustomOptions): LockupStorageContract => {
	const contractClient: Contract = new client.eth.Contract(
		lockupStorageAbi,
		address,
		{
			...options,
		}
	)

	return {
		getWithdrawalStatus: createGetWithdrawalStatusCaller(contractClient),
	}
}
