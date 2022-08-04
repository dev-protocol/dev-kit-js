/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'

export type CreateGetEstimatedEthForDevCaller = (
	contract: ethers.Contract,
	v: 'v2' | 'v3' | 'v2_polygon'
) => (devAmount: string) => Promise<string>

export const createGetEstimatedEthForDevCaller: CreateGetEstimatedEthForDevCaller =

		(contract: ethers.Contract, v: 'v2' | 'v3' | 'v2_polygon') =>
		async (devAmount: string) => {
			const res = await execute<QueryOption, string | readonly string[]>({
				contract,
				method: 'getEstimatedEthForDev',
				args: [devAmount],
				mutation: false,
				static: true,
			})
			return Array.isArray(res) ? res[v === 'v2_polygon' ? 2 : 1] : res
		}
