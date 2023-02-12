/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateMigrateToSTokensCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createMigrateToSTokensCaller: CreateMigrateToSTokensCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'migrateToSTokens',
			mutation: true,
			args: [propertyAddress],
			overrides,
		})
