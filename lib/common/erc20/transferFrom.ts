import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../utils/execute'
import { T } from 'ramda'

export type CreateTransferFromCaller = (
	contract: ethers.Contract
) => (
	from: string,
	to: string,
	value: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createTransferFromCaller: CreateTransferFromCaller =
	(contract: ethers.Contract) =>
	async (
		from: string,
		to: string,
		value: string,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'transferFrom',
			mutation: true,
			args: [from, to, value],
			overrides,
		}).then(T)
