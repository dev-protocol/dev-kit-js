import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type RemoveImage = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	keys: readonly string[],
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createRemoveImageCaller: RemoveImage =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		keys: readonly string[],
		overrides?: FallbackableOverrides,
	) =>
		execute<MutationOption>({
			contract,
			method: 'removeImage',
			mutation: true,
			args: [propertyAddress, keys],
			overrides,
		})
