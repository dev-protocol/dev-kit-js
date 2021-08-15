import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'

export type CreateGetCaller = (
	contract: ethers.Contract
) => (index: string) => Promise<string>

export const createGetCaller: CreateGetCaller = (
	contract: ethers.Contract
) => async (index: string): Promise<string> =>
	execute<QueryOption>({
		contract,
		method: 'get',
		args: [index],
		mutation: false,
	})
