/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateDepositToPositionCaller = (
	contract: ethers.Contract,
) => (
	positionTokenId: string,
	amount: string,
	overrides?: FallbackableOverrides,
) => Promise<TransactionResponse>

export const createDepositToPositionCaller: CreateDepositToPositionCaller =
	(contract: ethers.Contract) =>
	async (
		positionTokenId: string,
		amount: string,
		overrides?: FallbackableOverrides,
	) =>
		execute<MutationOption>({
			contract,
			method: 'depositToPosition',
			mutation: true,
			args: [positionTokenId, amount],
			overrides,
		})
