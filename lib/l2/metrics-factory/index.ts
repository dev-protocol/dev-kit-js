import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { metricsFactoryAbi } from './abi'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'

export type CreateMetricsFactoryContract = {
	readonly authenticatedPropertiesCount: () => Promise<string>
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
		}
	}
