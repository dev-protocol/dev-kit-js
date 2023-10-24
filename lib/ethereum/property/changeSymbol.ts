import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type CreateChangeSymbolCaller = (
	contract: ethers.Contract,
) => (
	nextAuther: string,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createChangeSymbolCaller: CreateChangeSymbolCaller =
	(contract: ethers.Contract) =>
	async (nextSymbol: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'changeSymbol',
			mutation: true,
			args: [nextSymbol],
			overrides,
		})
