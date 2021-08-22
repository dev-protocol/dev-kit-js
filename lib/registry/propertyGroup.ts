import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreatePropertyGroupCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPropertyGroupCaller: CreatePropertyGroupCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'propertyGroup',
			mutation: false,
		})
	)
