import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { metricsAbi } from './abi'
import { CustomOptions } from '../option'
import { createPropertyCaller } from './property'
import { createMarketCaller } from './market'
import { always } from 'ramda'

export type CreateMetricsContract = {
	readonly property: () => Promise<string>
	readonly market: () => Promise<string>
	readonly contract: () => Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateMetricsContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...metricsAbi],
		address,
		{
			...options,
		}
	)

	return {
		property: createPropertyCaller(contractClient),
		market: createMarketCaller(contractClient),
		contract: always(contractClient),
	}
}
