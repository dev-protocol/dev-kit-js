import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateApproveCaller = (
	contract: ethers.Contract,
) => (
	to: string,
	value: string,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createApproveCaller: CreateApproveCaller =
	(contract: ethers.Contract) =>
	async (to: string, value: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'approve',
			mutation: true,
			args: [to, value],
			overrides,
		})
