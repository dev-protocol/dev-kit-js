import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'

export type CreateCalculateWithdrawableAmountCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createCalculateWithdrawableAmountCaller: CreateCalculateWithdrawableAmountCaller =

		(contract: ethers.Contract) =>
		async (propertyAddress: string, accountAddress: string) =>
			execute<QueryOption>({
				contract,
				method: 'calculateWithdrawableAmount',
				args: [propertyAddress, accountAddress],
				mutation: false,
			})
