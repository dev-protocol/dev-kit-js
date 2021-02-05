import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { metricsGroupAbi } from './abi'
import { CustomOptions } from '../option'
import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties'
import { always } from 'ramda'

export type CreateMetricsGroupContract = {
	readonly totalAuthenticatedProperties: () => Promise<string>
	readonly contract: () => Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsGroupContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateMetricsGroupContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...metricsGroupAbi],
		address,
		{
			...options,
		}
	)

	return {
		totalAuthenticatedProperties: createTotalAuthenticatedPropertiesCaller(
			contractClient
		),
		contract: always(contractClient),
	}
}
