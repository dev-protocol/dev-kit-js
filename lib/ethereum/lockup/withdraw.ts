import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateWithdrawCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	amount: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createWithdrawCaller: CreateWithdrawCaller =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		amount: string,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'withdraw',
			mutation: true,
			args: [propertyAddress, amount],
			overrides,
		}).then(T)
