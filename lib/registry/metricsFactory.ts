import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateMetricsFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createMetricsFactoryCaller: CreateMetricsFactoryCaller = (
	contract: Contract
) => async () => execute({ contract, method: 'metricsFactory' })
