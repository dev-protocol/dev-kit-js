import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetAuthenticatedPropertiesCaller = (
	contract: ethers.Contract,
) => () => Promise<readonly string[]>

export const createGetAuthenticatedPropertiesCaller: CreateGetAuthenticatedPropertiesCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption, readonly string[]>({
				contract,
				method: 'getAuthenticatedProperties',
				mutation: false,
			}),
		)
