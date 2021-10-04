import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetRewardsAmountCaller = (
	contract: ethers.Contract
) => (address: string) => Promise<string>

export const createGetRewardsAmountCaller: CreateGetRewardsAmountCaller =
	(contract: ethers.Contract) => async (address: string) =>
		execute<QueryOption>({
			contract,
			method: 'getRewardsAmount',
			args: [address],
			mutation: false,
		})
