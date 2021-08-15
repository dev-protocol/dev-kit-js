import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateCountCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createCountCaller: CreateCountCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'count',
			mutation: false,
		})
	)
