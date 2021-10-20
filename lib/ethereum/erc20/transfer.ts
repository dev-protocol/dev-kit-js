import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateTransferCaller = (
	contract: ethers.Contract
) => (
	to: string,
	value: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createTransferCaller: CreateTransferCaller =
	(contract: ethers.Contract) =>
	async (to: string, value: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'transfer',
			args: [to, value],
			mutation: true,
			overrides,
		}).then(T)
