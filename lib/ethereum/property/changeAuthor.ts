import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateChangeAuthorCaller = (
	contract: ethers.Contract
) => (nextAuther: string, overrides?: FallbackableOverrides) => Promise<boolean>

export const createChangeAuthorCaller: CreateChangeAuthorCaller =
	(contract: ethers.Contract) =>
	async (nextAuther: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'changeAuthor',
			mutation: true,
			args: [nextAuther],
			overrides,
		}).then(T)
