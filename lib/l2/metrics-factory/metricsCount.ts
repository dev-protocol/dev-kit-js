/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMetricsCountCaller = (
	contract: ethers.Contract
) => () => Promise<number>

export const createMetricsCountCaller: CreateMetricsCountCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'metricsCount',
			mutation: false,
		}).then(Number)
	)
