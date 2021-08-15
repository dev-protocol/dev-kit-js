import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'

export type CreateGetStorageWithdrawalStatusCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, accountAddress: string) => Promise<string>

export const createGetStorageWithdrawalStatusCaller: CreateGetStorageWithdrawalStatusCaller = (
	contract: ethers.Contract
) => async (propertyAddress: string, accountAddress: string) =>
	execute<QueryOption>({
		contract,
		method: 'getStorageWithdrawalStatus',
		args: [propertyAddress, accountAddress],
		mutation: false,
	})
