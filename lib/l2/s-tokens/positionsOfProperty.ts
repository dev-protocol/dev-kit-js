/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreatePositionsOfPropertyCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<readonly number[]>

export const createPositionsOfPropertyCaller: CreatePositionsOfPropertyCaller =
	(contract: ethers.Contract) => async (propertyAddress: string) => {
		const res = await execute<QueryOption, readonly string[]>({
			contract,
			method: 'positionsOfProperty',
			args: [propertyAddress],
			mutation: false,
		})
		return res.map(Number)
	}
