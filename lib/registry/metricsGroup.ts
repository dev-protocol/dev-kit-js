import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateMetricsGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createMetricsGroupCaller: CreateMetricsGroupCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'metricsGroup' })
