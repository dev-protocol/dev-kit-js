/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateTotalLockedForPropertyCaller = (
	contract: ethers.Contract,
) => (address: string) => Promise<string>

export const createTotalLockedForPropertyCaller: CreateTotalLockedForPropertyCaller =
	(contract: ethers.Contract) => async (address: string) =>
		execute<QueryOption>({
			contract,
			method: 'totalLockedForProperty',
			args: [address],
			mutation: false,
		})
