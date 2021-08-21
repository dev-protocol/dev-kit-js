import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateTotalAuthenticatedPropertiesCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createTotalAuthenticatedPropertiesCaller: CreateTotalAuthenticatedPropertiesCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption>({
				contract,
				method: 'totalAuthenticatedProperties',
				mutation: false,
			})
		)
