import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { withdrawAbi } from './abi'
import { CustomOptions } from '../option'
import { createWithdrawCaller } from './withdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'

export interface WithdrawContract {
	withdraw: (propertyAddress: string) => Promise<true>
	getRewardsAmount: (propertyAddress: string) => Promise<string>
	calculateWithdrawableAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
}

export type CreateWithdrawContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => WithdrawContract

export const createWithdrawContract: CreateWithdrawContract = (
	client: Web3
) => (address?: string, options?: CustomOptions): WithdrawContract => {
	const contractClient: Contract = new client.eth.Contract(
		withdrawAbi,
		address,
		{
			...options,
		}
	)

	return {
		withdraw: createWithdrawCaller(contractClient, client),
		getRewardsAmount: createGetRewardsAmountCaller(contractClient),
		calculateWithdrawableAmount: createCalculateWithdrawableAmountCaller(
			contractClient
		),
	}
}
