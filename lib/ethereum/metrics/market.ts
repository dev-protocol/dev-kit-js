import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMarketCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createMarketCaller: CreateMarketCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'market',
			mutation: false,
		}),
	)
