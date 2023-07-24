/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers, solidityPacked } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'
import { pathOf } from './path-of'

export type CreateGetEstimatedTokensForDevCaller = (
	contract: ethers.Contract,
) => (path: readonly (string | bigint)[], devAmount: string) => Promise<string>

export const createGetEstimatedTokensForDevCaller: CreateGetEstimatedTokensForDevCaller =

		(contract: ethers.Contract) =>
		async (path: readonly (string | bigint)[], devAmount: string) => {
			const res = await execute<QueryOption, string>({
				contract,
				method: 'getEstimatedTokensForDev',
				args: [pathOf(path), devAmount],
				mutation: false,
				static: true,
			})

			return res
		}
