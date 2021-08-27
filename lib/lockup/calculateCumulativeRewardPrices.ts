import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'
import { arrayify } from '../utils/arrayify'

export type CreateCalculateCumulativeRewardPricesCaller = (
	contract: ethers.Contract
) => () => Promise<readonly [string, string, string, string]>

export const createCalculateCumulativeRewardPricesCaller: CreateCalculateCumulativeRewardPricesCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption, Record<string, string>>({
				contract,
				method: 'calculateCumulativeRewardPrices',
				mutation: false,
			}).then((r) => arrayify(r) as readonly [string, string, string, string])
		)
