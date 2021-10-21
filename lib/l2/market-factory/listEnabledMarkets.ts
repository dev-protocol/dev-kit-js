import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateListEnabledMarketsCaller = (
	contract: ethers.Contract
) => () => Promise<readonly string[]>

export const createListEnabledMarketsCaller: CreateListEnabledMarketsCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption, readonly string[]>({
			contract,
			method: 'listEnabledMarkets',
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
