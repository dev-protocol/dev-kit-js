import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreatePropertyFactoryCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPropertyFactoryCaller: CreatePropertyFactoryCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'propertyFactory',
			mutation: false,
		})
	)
