import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { metricsFactoryAbi } from './abi'
import { CustomOptions } from '../../common/option'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'
import { always } from 'ramda'

export type CreateMetricsFactoryContract = {
	readonly authenticatedPropertiesCount: () => Promise<string>
	readonly contract: () => Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsFactoryContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): CreateMetricsFactoryContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...metricsFactoryAbi],
			address,
			{
				...options,
			}
		)

		return {
			authenticatedPropertiesCount:
				createAuthenticatedPropertiesCountCaller(contractClient),
			contract: always(contractClient),
		}
	}
