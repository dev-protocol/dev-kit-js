/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateDepositToPropertyCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	amount: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createDepositToPropertyCaller: CreateDepositToPropertyCaller =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		amount: string,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'depositToProperty',
			mutation: true,
			args: [propertyAddress, amount],
			overrides,
		})
