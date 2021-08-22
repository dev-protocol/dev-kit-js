import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreatePolicyCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPolicyCaller: CreatePolicyCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'policy',
			mutation: false,
		})
	)
