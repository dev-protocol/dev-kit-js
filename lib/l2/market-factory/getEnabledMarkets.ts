import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetEnabledMarketsCaller = (
	contract: ethers.Contract
) => () => Promise<readonly string[]>

export const createGetEnabledMarketsCaller: CreateGetEnabledMarketsCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption, readonly string[]>({
			contract,
			method: 'getEnabledMarkets',
			mutation: false,
		}).catch(
			// TODO: This fallback should be removed once the naming change is complete.
			always(
				execute<QueryOption, readonly string[]>({
					contract,
					method: 'enableMarketList',
					mutation: false,
				})
			)
		)
	)
