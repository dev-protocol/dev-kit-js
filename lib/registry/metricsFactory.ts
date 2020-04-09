import { Contract } from 'web3-eth-contract/types'

export type CreateMetricsFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createMetricsFactoryCaller: CreateMetricsFactoryCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.metricsFactory()
		.call()
		.then((result: string) => result)
