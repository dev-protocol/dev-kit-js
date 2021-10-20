import { ethers } from 'ethers'
import {
	execute,
	MutationOption,
	FallbackableOverrides,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateDepositCaller = (
	contract: ethers.Contract
) => (
	to: string,
	value: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createDepositCaller: CreateDepositCaller =
	(contract: ethers.Contract) =>
	async (to: string, value: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'deposit',
			args: [to, value],
			mutation: true,
			overrides,
		}).then(T)
