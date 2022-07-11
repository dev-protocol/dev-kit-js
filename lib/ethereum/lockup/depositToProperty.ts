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
	payload?: string | Uint8Array,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createDepositToPropertyCaller: CreateDepositToPropertyCaller =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		amount: string,
		payload?: string | Uint8Array,
		overrides?: FallbackableOverrides
	) =>
		execute<MutationOption>({
			contract,
			method: 'depositToProperty',
			mutation: true,
			args: payload
				? [propertyAddress, amount, payload]
				: [propertyAddress, amount],
			overrides,
		})
