import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { withdrawAbi } from './abi'
import { createWithdrawCaller } from './withdraw'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'

export type WithdrawContract = {
	readonly withdraw: (propertyAddress: string) => Promise<boolean>
	readonly getRewardsAmount: (propertyAddress: string) => Promise<string>
	readonly calculateWithdrawableAmount: (
		propertyAddress: string,
		accountAddress: string
	) => Promise<string>
}

export const createWithdrawContract = (provider: Provider | Signer) => (
	address: string
): WithdrawContract => {
	const contractClient = new ethers.Contract(
		address,
		[...withdrawAbi],
		provider
	)

	return {
		withdraw: createWithdrawCaller(contractClient),
		getRewardsAmount: createGetRewardsAmountCaller(contractClient),
		calculateWithdrawableAmount: createCalculateWithdrawableAmountCaller(
			contractClient
		),
	}
}
