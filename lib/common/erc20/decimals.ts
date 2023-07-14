import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateDecimalsCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createDecimalsCaller: CreateDecimalsCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'decimals',
			mutation: false,
		}),
	)
