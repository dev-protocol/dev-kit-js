import { ethers } from 'ethers'
import type { TransactionResponse } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'

export type CreateVoteCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	agree: boolean,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createVoteCaller: CreateVoteCaller =
	(
		contract: ethers.Contract,
	): ((
		propertyAddress: string,
		agree: boolean,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>) =>
	async (
		propertyAddress: string,
		agree: boolean,
		overrides?: FallbackableOverrides,
	): Promise<TransactionResponse> =>
		execute<MutationOption>({
			contract,
			method: 'vote',
			args: [propertyAddress, agree],
			mutation: true,
			overrides,
		})
