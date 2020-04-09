import { Contract } from 'web3-eth-contract/types'

export type CreateMetricsGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createMetricsGroupCaller: CreateMetricsGroupCaller = (
	contract: Contract
) => async () =>
	contract.methods
		.metricsGroup()
		.call()
		.then((result: string) => result)
