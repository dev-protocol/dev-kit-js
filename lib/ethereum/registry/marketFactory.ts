import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMarketFactoryCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createMarketFactoryCaller: CreateMarketFactoryCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'marketFactory',
			mutation: false,
		})
	)
