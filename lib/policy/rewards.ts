import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'

export type CreateRewardsCaller = (
	contract: ethers.Contract
) => (lockups: string, assets: string) => Promise<string>

export const createRewardsCaller: CreateRewardsCaller =
	(contract: ethers.Contract) =>
	async (lockups: string, assets: string): Promise<string> =>
		execute({
			contract,
			method: 'rewards',
			args: [lockups, assets],
			mutation: false,
		})
