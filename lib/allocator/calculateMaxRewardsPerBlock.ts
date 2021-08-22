import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateCalculateMaxRewardsPerBlockCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createCalculateMaxRewardsPerBlockCaller: CreateCalculateMaxRewardsPerBlockCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption>({
				contract,
				method: 'calculateMaxRewardsPerBlock',
				mutation: false,
			})
		)
