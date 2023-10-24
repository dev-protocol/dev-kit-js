/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type CreateWithdrawByPositionCaller = (
	contract: ethers.Contract,
) => (
	positionTokenId: string,
	amount: string,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createWithdrawByPositionCaller: CreateWithdrawByPositionCaller =
	(contract: ethers.Contract) =>
	async (
		positionTokenId: string,
		amount: string,
		overrides?: FallbackableOverrides,
	) =>
		execute<MutationOption>({
			contract,
			method: 'withdrawByPosition',
			mutation: true,
			args: [positionTokenId, amount],
			overrides,
		})
