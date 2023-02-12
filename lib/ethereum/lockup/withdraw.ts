import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateWithdrawCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	amount: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createWithdrawCaller: CreateWithdrawCaller =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		amount: string,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'withdraw',
			mutation: true,
			args: [propertyAddress, amount],
			overrides,
		})
