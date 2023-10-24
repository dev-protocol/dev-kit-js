import { ethers } from 'ethers'
import {
	execute,
	MutationOption,
	FallbackableOverrides,
} from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type CreateDepositCaller = (
	contract: ethers.Contract,
) => (
	to: string,
	value: string,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createDepositCaller: CreateDepositCaller =
	(contract: ethers.Contract) =>
	async (to: string, value: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'deposit',
			args: [to, value],
			mutation: true,
			overrides,
		})
