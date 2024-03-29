import { ethers } from 'ethers'
import { execute, MutationOption } from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type CreateSetSTokenRoyaltyForPropertyCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string, royalty: number) => Promise<TransactionResponse>

export const createSetSTokenRoyaltyForPropertyCaller: CreateSetSTokenRoyaltyForPropertyCaller =

		(contract: ethers.Contract) =>
		async (propertyAddress: string, royalty: number) =>
			execute<MutationOption>({
				contract,
				method: 'setSTokenRoyaltyForProperty',
				mutation: true,
				args: [propertyAddress, String(royalty)],
			})
