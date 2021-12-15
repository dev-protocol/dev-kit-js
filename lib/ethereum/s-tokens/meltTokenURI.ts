import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateMeltTokenURICaller = (
	contract: ethers.Contract
) => (tokenId: number, overrides?: FallbackableOverrides) => Promise<boolean>

export const createMeltTokenURICaller: CreateMeltTokenURICaller =
	(contract: ethers.Contract) =>
	async (tokenId: number, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'meltTokenURI',
			mutation: true,
			args: [String(tokenId)],
			overrides,
		}).then(T)
