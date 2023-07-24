import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateTotalIssuedMetrics = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createTotalIssuedMetrics: CreateTotalIssuedMetrics = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'totalIssuedMetrics',
			mutation: false,
		}),
	)
