import { ContractRunner, ethers } from 'ethers'
import { metricsFactoryAbi } from './abi'
import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'
import { createMetricsOfPropertyCaller } from './metricsOfProperty'
import { createMetricsCountCaller } from './metricsCount'
import { always } from 'ramda'

export type MetricsFactoryContract = {
	readonly authenticatedPropertiesCount: () => Promise<string>
	readonly metricsCount: () => Promise<number>
	readonly metricsOfProperty: (
		propertyAddress: string
	) => Promise<readonly string[]>
	readonly contract: () => ethers.Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsFactoryContract =
	(provider: ContractRunner) =>
	(address: string): MetricsFactoryContract => {
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
			contract: always(contract),
		}
	}
