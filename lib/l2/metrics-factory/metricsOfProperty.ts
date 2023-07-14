/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateMetricsOfPropertyCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string) => Promise<readonly string[]>

export const createMetricsOfPropertyCaller: CreateMetricsOfPropertyCaller =
	(contract: ethers.Contract) => (propertyAddress: string) =>
		execute<QueryOption, readonly string[]>({
			contract,
			method: 'metricsOfProperty',
			args: [propertyAddress],
			mutation: false,
		})
