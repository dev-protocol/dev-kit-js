import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateCreateCaller = (
	contract: ethers.Contract
) => (
	marketBehaviorAddress: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createCreateCaller: CreateCreateCaller =
	(contract: ethers.Contract) =>
	async (marketBehaviorAddress: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'create',
			mutation: true,
			args: [marketBehaviorAddress],
			overrides,
		})
