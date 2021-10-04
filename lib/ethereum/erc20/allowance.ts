import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateAllowanceCaller = (
	contract: ethers.Contract
) => (from: string, to: string) => Promise<string>

export const createAllowanceCaller: CreateAllowanceCaller =
	(contract: ethers.Contract) => async (from: string, to: string) =>
		execute<QueryOption>({
			contract,
			method: 'allowance',
			args: [from, to],
			mutation: false,
		})
