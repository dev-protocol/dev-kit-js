import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { metricsFactoryAbi } from './abi'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'
import { createMetricsOfPropertyCaller } from './metricsOfProperty'
import { createMetricsCountCaller } from './metricsCount'

export type CreateMetricsFactoryContract = {
	readonly authenticatedPropertiesCount: () => Promise<string>
	readonly metricsCount: () => Promise<number>
	readonly metricsOfProperty: (
		propertyAddress: string
	) => Promise<readonly string[]>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsFactoryContract =
	(provider: Provider | Signer) =>
	(address: string): CreateMetricsFactoryContract => {
		const contract = new ethers.Contract(
			address,
			[...metricsFactoryAbi],
			provider
		)

		return {
			authenticatedPropertiesCount:
				createAuthenticatedPropertiesCountCaller(contract),
			metricsCount: createMetricsCountCaller(contract),
			metricsOfProperty: createMetricsOfPropertyCaller(contract),
		}
	}
