/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetPropertiesOfAuthorCaller = (
	contract: ethers.Contract
) => (authorAddress: string) => Promise<readonly string[]>

export const createGetPropertiesOfAuthorCaller: CreateGetPropertiesOfAuthorCaller =
	(contract: ethers.Contract) => async (authorAddress: string) => {
		const res = await execute<QueryOption, readonly string[]>({
			contract,
			method: 'getPropertiesOfAuthor',
			args: [authorAddress],
			mutation: false,
		})
		return res
	}
