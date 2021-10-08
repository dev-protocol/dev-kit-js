import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateEnabledMarketsCaller = (
	contract: ethers.Contract
) => () => Promise<readonly string[]>

export const createEnabledMarketsCaller: CreateEnabledMarketsCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption, readonly string[]>({
			contract,
			method: 'enabledMarkets',
			mutation: false,
		})
	)
