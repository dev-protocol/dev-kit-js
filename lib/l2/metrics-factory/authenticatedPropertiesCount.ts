/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateAuthenticatedPropertiesCountCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createAuthenticatedPropertiesCountCaller: CreateAuthenticatedPropertiesCountCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption>({
				contract,
				method: 'authenticatedPropertiesCount',
				mutation: false,
			}),
		)
