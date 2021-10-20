/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateDepositToPositionCaller = (
	contract: ethers.Contract
) => (
	positionTokenId: string,
	amount: string,
	overrides?: FallbackableOverrides
) => Promise<boolean>

export const createDepositToPositionCaller: CreateDepositToPositionCaller =
	(contract: ethers.Contract) =>
	async (
		positionTokenId: string,
		amount: string,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'depositToPosition',
			mutation: true,
			args: [positionTokenId, amount],
			overrides,
		}).then(T)
