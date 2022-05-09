/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetEstimatedDevForEthCaller = (
	contract: ethers.Contract
) => (ethAmount: string) => Promise<string>

export const createGetEstimatedDevForEthCaller: CreateGetEstimatedDevForEthCaller =
	(contract: ethers.Contract) => async (ethAmount: string) =>
		execute<QueryOption>({
			contract,
			method: 'getEstimatedDevForEth',
			args: [ethAmount],
			mutation: false,
			static: true,
		})
