import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateAuthorCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createAuthorCaller: CreateAuthorCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'author',
			mutation: false,
		})
	)
