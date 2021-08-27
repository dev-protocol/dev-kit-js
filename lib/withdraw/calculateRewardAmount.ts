import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'


export type calculateRewardAmountCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	accountAddress: string
) => Promise<string>

export const calculateRewardAmountCaller: calculateRewardAmountCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, accountAddress: string) =>
		execute<QueryOption>({
			contract,
			method: 'calculateRewardAmount',
			args: [propertyAddress, accountAddress],
			mutation: false
		})
