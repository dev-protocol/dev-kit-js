/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'

export type CreateGetEstimatedDevForEthCaller = (
	contract: ethers.Contract
) => (ethAmount: string) => Promise<string>

export const createGetEstimatedDevForEthCaller: CreateGetEstimatedDevForEthCaller =
	(contract: ethers.Contract) => async (ethAmount: string) => {
		const res = await execute<QueryOption, string | readonly string[]>({
			contract,
			method: 'getEstimatedDevForEth',
			args: [ethAmount],
			mutation: false,
			static: true,
		})

		return Array.isArray(res) ? res[1] : res
	}
