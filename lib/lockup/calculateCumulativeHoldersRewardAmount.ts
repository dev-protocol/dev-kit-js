import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'

export type CreateCalculateCumulativeHoldersRewardAmountCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<string>

export const createCalculateCumulativeHoldersRewardAmountCaller: CreateCalculateCumulativeHoldersRewardAmountCaller =
	(contract: ethers.Contract) => async (propertyAddress: string) =>
		execute<QueryOption>({
			contract,
			method: 'calculateCumulativeHoldersRewardAmount',
			args: [propertyAddress],
			mutation: false,
		})
