/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateCalculateCumulativeRewardPricesCaller = (
	contract: Contract
) => () => Promise<readonly string[]>

export const createCalculateCumulativeRewardPricesCaller: CreateCalculateCumulativeRewardPricesCaller = (
	contract: Contract
) => always(execute({ contract, method: 'calculateCumulativeRewardPrices' }))
