import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateMetricsGroupCaller = (
	contract: Contract
) => () => Promise<string>

export const createMetricsGroupCaller: CreateMetricsGroupCaller = (
	contract: Contract
) => always(execute({ contract, method: 'metricsGroup' }))
