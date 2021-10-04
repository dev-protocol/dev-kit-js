import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreatePropertyCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPropertyCaller: CreatePropertyCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'property',
			mutation: false,
		})
	)
