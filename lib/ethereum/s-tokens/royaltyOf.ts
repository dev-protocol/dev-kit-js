/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateRoyaltyOfCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<string>

export const createRoyaltyOfCaller: CreateRoyaltyOfCaller =
	(contract: ethers.Contract) => async (propertyAddress: string) => {
		const res = execute<QueryOption>({
			contract,
			method: 'royaltyOf',
			args: [propertyAddress],
			mutation: false,
		})
		return res
	}
