import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateChangeNameCaller = (
	contract: ethers.Contract
) => (
	nextAuther: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createChangeNameCaller: CreateChangeNameCaller =
	(contract: ethers.Contract) =>
	async (nextName: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'changeName',
			mutation: true,
			args: [nextName],
			overrides,
		})
