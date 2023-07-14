import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetEnabledMarketsCaller = (
	contract: ethers.Contract,
) => () => Promise<readonly string[]>

export const createGetEnabledMarketsCaller: CreateGetEnabledMarketsCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption, readonly string[]>({
			contract,
			method: 'getEnabledMarkets',
			mutation: false,
		}),
	)
