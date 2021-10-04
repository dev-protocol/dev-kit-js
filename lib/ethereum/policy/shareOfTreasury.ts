import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateShareOfTreasuryCaller = (
	contract: ethers.Contract
) => (supply: string) => Promise<string>

export const createShareOfTreasuryCaller: CreateShareOfTreasuryCaller =
	(contract: ethers.Contract) =>
	async (supply: string): Promise<string> =>
		execute({
			contract,
			method: 'shareOfTreasury',
			args: [supply],
			mutation: false,
		})
