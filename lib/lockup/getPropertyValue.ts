import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'

export type CreateGetPropertyValueCaller = (
	contract: ethers.Contract
) => (address: string) => Promise<string>

export const createGetPropertyValueCaller: CreateGetPropertyValueCaller =
	(contract: ethers.Contract) => async (address: string) =>
		execute<QueryOption>({
			contract,
			method: 'getPropertyValue',
			args: [address],
			mutation: false,
		})
