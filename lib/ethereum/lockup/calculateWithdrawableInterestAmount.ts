import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateCalculateWithdrawableInterestAmountCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, account: string) => Promise<string>

export const createCalculateWithdrawableInterestAmountCaller: CreateCalculateWithdrawableInterestAmountCaller =

		(contract: ethers.Contract) =>
		async (propertyAddress: string, account: string) =>
			execute<QueryOption>({
				contract,
				method: 'calculateWithdrawableInterestAmount',
				args: [propertyAddress, account],
				mutation: false,
			})
