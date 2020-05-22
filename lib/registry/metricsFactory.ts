import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateMetricsFactoryCaller = (
	contract: Contract
) => () => Promise<string>

export const createMetricsFactoryCaller: CreateMetricsFactoryCaller = (
	contract: Contract
) => always(execute({ contract, method: 'metricsFactory' }))
