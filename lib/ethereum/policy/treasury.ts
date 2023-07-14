import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateTreasuryCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createTreasuryCaller: CreateTreasuryCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'treasury',
			mutation: false,
		}),
	)
