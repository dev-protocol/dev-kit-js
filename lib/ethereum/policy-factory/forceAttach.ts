import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateForceAttachCaller = (
	contract: ethers.Contract
) => (
	policy: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createForceAttachCaller: CreateForceAttachCaller =
	(contract: ethers.Contract) =>
	async (policy: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'forceAttach',
			mutation: true,
			args: [policy],
			overrides,
		})
