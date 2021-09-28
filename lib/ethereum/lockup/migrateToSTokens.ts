/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateMigrateToSTokensCaller = (
	contract: Contract,
	client: Web3
) => (propertyAddress: string) => Promise<boolean>

export const createMigrateToSTokensCaller: CreateMigrateToSTokensCaller =
	(contract: Contract, client: Web3) => async (propertyAddress: string) =>
		execute({
			contract,
			method: 'migrateToSTokens',
			mutation: true,
			client,
			args: [propertyAddress],
		}).then(T)
