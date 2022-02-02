import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateTransferFromCaller = (
	contract: ethers.Contract
) => (
	from: string,
	to: string,
	value: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createTransferFromCaller: CreateTransferFromCaller =
	(contract: ethers.Contract) =>
	async (
		from: string,
		to: string,
		value: string,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'transferFrom',
			mutation: true,
			args: [from, to, value],
			overrides,
		})
