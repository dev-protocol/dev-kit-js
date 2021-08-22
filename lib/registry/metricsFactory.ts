import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateMetricsFactoryCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createMetricsFactoryCaller: CreateMetricsFactoryCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'metricsFactory',
			mutation: false,
		})
	)
