import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateTotalSupplyCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createTotalSupplyCaller: CreateTotalSupplyCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'totalSupply',
			mutation: false,
		})
	)
