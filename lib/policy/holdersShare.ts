import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'

export type CreateHoldersShareCaller = (
	contract: ethers.Contract
) => (amount: string, lockups: string) => Promise<string>

export const createHoldersShareCaller: CreateHoldersShareCaller =
	(contract: ethers.Contract) =>
	async (amount: string, lockups: string): Promise<string> =>
		execute<QueryOption>({
			contract,
			method: 'holdersShare',
			args: [amount, lockups],
			mutation: false,
		})
