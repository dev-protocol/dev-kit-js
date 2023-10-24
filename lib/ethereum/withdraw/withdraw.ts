import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type CreateWithdrawCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createWithdrawCaller: CreateWithdrawCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'withdraw',
			mutation: true,
			args: [propertyAddress],
			overrides,
		})
