import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateGetLastAssetValueEachMetricsCaller = (
	contract: Contract
) => (metricsAddress: string) => Promise<string>

export const createGetLastAssetValueEachMetricsCaller: CreateGetLastAssetValueEachMetricsCaller = (
	contract: Contract
) => async (metricsAddress: string) =>
	execute({
		contract,
		method: 'getLastAssetValueEachMetrics',
		args: [metricsAddress],
	})
