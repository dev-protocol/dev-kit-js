import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'

export type CreateGetValueCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetValueCaller: CreateGetValueCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, accountAddress: string) =>
		execute<QueryOption>({
			contract,
			method: 'getValue',
			args: [propertyAddress, accountAddress],
			mutation: false,
		})
