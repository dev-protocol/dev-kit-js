/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'

export type CreateGetEstimatedUsdcForDevCaller = (
	contract: ethers.Contract,
) => (devAmount: string) => Promise<string>

export const createGetEstimatedUsdcForDevCaller: CreateGetEstimatedUsdcForDevCaller =
	(contract: ethers.Contract) => async (devAmount: string) => {
		const res = await execute<QueryOption, string | readonly string[]>({
			contract,
			method: 'getEstimatedUsdcForDev',
			args: [devAmount],
			mutation: false,
			static: true,
		})

		return Array.isArray(res) ? res[1] : res
	}
