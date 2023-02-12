import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateGetMetricsCaller = (
	contract: ethers.Contract
) => (id: string) => Promise<string>

export const createGetMetricsCaller: CreateGetMetricsCaller =
	(contract: ethers.Contract) => (id: string) =>
		execute<QueryOption>({
			contract,
			method: 'getMetrics',
			args: [id],
			mutation: false,
		})
