import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateSetTokenURIImageCaller = (
	contract: ethers.Contract
) => (
	tokenId: number,
	data: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createSetTokenURIImageCaller: CreateSetTokenURIImageCaller =
	(contract: ethers.Contract) =>
	async (tokenId: number, data: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'setTokenURIImage',
			mutation: true,
			args: [String(tokenId), data],
			overrides,
		}).then(T)
