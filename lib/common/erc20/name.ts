import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateNameCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createNameCaller: CreateNameCaller = (contract: ethers.Contract) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'name',
			mutation: false,
		}),
	)
