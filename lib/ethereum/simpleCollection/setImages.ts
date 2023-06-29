import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

import { Image } from './types'

export type SetImages = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	images: readonly Image[],
	keys: readonly string[],
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const setImages: SetImages =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		images: readonly Image[],
		keys: readonly string[],
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'setImages',
			mutation: true,
			args: [propertyAddress, images, keys],
			overrides,
		})
