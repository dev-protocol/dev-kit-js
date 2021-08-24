import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { arrayify } from '../utils/arrayify'

export type CreateCalculateRewardAmountCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<readonly [string, string]>

export const createCalculateRewardAmountCaller: CreateCalculateRewardAmountCaller =
	(contract: ethers.Contract) => async (propertyAddress: string) =>
		execute<QueryOption, Record<string, string>>({
			contract,
			method: 'calculateRewardAmount',
			args: [propertyAddress],
			mutation: false,
		}).then((r) => arrayify(r) as readonly [string, string])
