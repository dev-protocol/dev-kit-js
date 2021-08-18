import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'

export type CreateBalanceOfCaller = (
	contract: ethers.Contract
) => (address: string) => Promise<string>

export const createBalanceOfCaller: CreateBalanceOfCaller =
	(contract: ethers.Contract) => async (address: string) =>
		execute<QueryOption>({
			contract,
			method: 'balanceOf',
			args: [address],
			mutation: false,
		})
