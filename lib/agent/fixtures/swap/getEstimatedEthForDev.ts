/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'

export type CreateGetEstimatedEthForDevCaller = (
	contract: ethers.Contract,
) => (devAmount: string) => Promise<string>

export const createGetEstimatedEthForDevCaller: CreateGetEstimatedEthForDevCaller =
	(contract: ethers.Contract) => async (devAmount: string) => {
		const res = await execute<QueryOption, string | readonly string[]>({
			contract,
			method: 'getEstimatedEthForDev',
			args: [devAmount],
			mutation: false,
			static: true,
		})
		return Array.isArray(res) ? res[0] : res
	}
