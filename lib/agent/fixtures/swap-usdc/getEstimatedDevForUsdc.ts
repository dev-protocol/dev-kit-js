/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'

export type CreateGetEstimatedDevForUsdcCaller = (
	contract: ethers.Contract,
) => (usdcAmount: string) => Promise<string>

export const createGetEstimatedDevForUsdcCaller: CreateGetEstimatedDevForUsdcCaller =
	(contract: ethers.Contract) => async (usdcAmount: string) => {
		const res = await execute<QueryOption, string | readonly string[]>({
			contract,
			method: 'getEstimatedDevForUsdc',
			args: [usdcAmount],
			mutation: false,
			static: true,
		})

		return Array.isArray(res) ? res[1] : res
	}
