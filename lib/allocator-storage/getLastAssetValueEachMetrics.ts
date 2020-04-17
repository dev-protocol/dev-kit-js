import { Contract } from 'web3-eth-contract/types'

export type CreateGetLastAssetValueEachMetricsCaller = (
	contract: Contract
) => (metricsAddress: string) => Promise<string>

export const createGetLastAssetValueEachMetricsCaller: CreateGetLastAssetValueEachMetricsCaller = (
	contract: Contract
) => async (metricsAddress: string) =>
	contract.methods
		.getLastAssetValueEachMetrics(metricsAddress)
		.call()
		.then((result: string) => result)
