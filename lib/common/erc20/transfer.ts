import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateTransferCaller = (
	contract: ethers.Contract
) => (
	to: string,
	value: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createTransferCaller: CreateTransferCaller =
	(contract: ethers.Contract) =>
	async (to: string, value: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'transfer',
			args: [to, value],
			mutation: true,
			overrides,
		})
