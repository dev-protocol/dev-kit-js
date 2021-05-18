/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'
import { arrayify } from '../utils/arrayify'

export type CreateCalculateCumulativeRewardPricesCaller = (
	contract: Contract
) => () => Promise<readonly [string, string, string, string]>

export const createCalculateCumulativeRewardPricesCaller: CreateCalculateCumulativeRewardPricesCaller =
	(contract: Contract) =>
		always(
			execute<Record<string, string>>({
				contract,
				method: 'calculateCumulativeRewardPrices',
			}).then((r) => arrayify(r) as readonly [string, string, string, string])
		)
