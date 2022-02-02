import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateFreezeTokenURICaller = (
	contract: ethers.Contract
) => (
	tokenId: number,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createFreezeTokenURICaller: CreateFreezeTokenURICaller =
	(contract: ethers.Contract) =>
	async (tokenId: number, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'freezeTokenURI',
			mutation: true,
			args: [String(tokenId)],
			overrides,
		})
