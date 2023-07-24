/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreatePositionsOfOwnerCaller = (
	contract: ethers.Contract,
) => (accountAddress: string) => Promise<readonly number[]>

export const createPositionsOfOwnerCaller: CreatePositionsOfOwnerCaller =
	(contract: ethers.Contract) => async (accountAddress: string) => {
		const res = await execute<QueryOption, readonly string[]>({
			contract,
			method: 'positionsOfOwner',
			args: [accountAddress],
			mutation: false,
		})
		return res.map(Number)
	}
