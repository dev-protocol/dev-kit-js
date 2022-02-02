import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateChangeAuthorCaller = (
	contract: ethers.Contract
) => (
	nextAuther: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createChangeAuthorCaller: CreateChangeAuthorCaller =
	(contract: ethers.Contract) =>
	async (nextAuther: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'changeAuthor',
			mutation: true,
			args: [nextAuther],
			overrides,
		})
