import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateApproveCaller = (
	contract: ethers.Contract
) => (
	to: string,
	value: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createApproveCaller: CreateApproveCaller =
	(contract: ethers.Contract) =>
	async (to: string, value: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'approve',
			mutation: true,
			args: [to, value],
			overrides,
		}).then(T)
