/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, MutationOption } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateMigrateToSTokensCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<boolean>

export const createMigrateToSTokensCaller: CreateMigrateToSTokensCaller =
	(contract: ethers.Contract) => async (propertyAddress: string) =>
		execute<MutationOption>({
			contract,
			method: 'migrateToSTokens',
			mutation: true,
			args: [propertyAddress],
		}).then(T)
