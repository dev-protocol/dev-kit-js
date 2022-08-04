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
		const polygonIDs = [137, 80001]
		const chain = (await contract.provider.getNetwork()).chainId
		return Array.isArray(res) ? res[polygonIDs.includes(chain) ? 2 : 1] : res
	}
