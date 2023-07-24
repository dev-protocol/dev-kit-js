/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers, solidityPacked } from 'ethers'
import { execute, QueryOption } from '../../../common/utils/execute'
import { pathOf } from './path-of'

export type CreateGetEstimatedDevForTokensCaller = (
	contract: ethers.Contract,
) => (
	path: readonly (string | bigint)[],
	tokenAmount: string,
) => Promise<string>

export const createGetEstimatedDevForTokensCaller: CreateGetEstimatedDevForTokensCaller =

		(contract: ethers.Contract) =>
		async (path: readonly (string | bigint)[], tokenAmount: string) => {
			const res = await execute<QueryOption, string>({
				contract,
				method: 'getEstimatedDevForTokens',
				args: [pathOf(path), tokenAmount],
				mutation: false,
				static: true,
			})

			return res
		}
