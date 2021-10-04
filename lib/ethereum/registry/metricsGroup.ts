import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMetricsGroupCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createMetricsGroupCaller: CreateMetricsGroupCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'metricsGroup',
			mutation: false,
		})
	)
