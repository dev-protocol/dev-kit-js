import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { metricsGroupAbi } from './abi'
import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties'

export type CreateMetricsGroupContract = {
	readonly totalAuthenticatedProperties: () => Promise<string>
}

export const createMetricsGroupContract =
	(provider: Provider | Signer) =>
	(address: string): CreateMetricsGroupContract => {
		const contract = new ethers.Contract(
			address,
			[...metricsGroupAbi],
			provider
		)

		return {
			totalAuthenticatedProperties:
				createTotalAuthenticatedPropertiesCaller(contract),
		}
	}
