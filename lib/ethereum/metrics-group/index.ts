import { ContractRunner, ethers } from 'ethers'
import { metricsGroupAbi } from './abi'
import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties'
import { createTotalIssuedMetrics } from './totalIssuedMetrics'

export type CreateMetricsGroupContract = {
	readonly totalAuthenticatedProperties: () => Promise<string>
	readonly totalIssuedMetrics: () => Promise<string>
	readonly contract: () => ethers.Contract
}

export const createMetricsGroupContract =
	(provider: ContractRunner) =>
	(address: string): CreateMetricsGroupContract => {
		const contract = new ethers.Contract(
			address,
			[...metricsGroupAbi],
			provider,
		)

		return {
			totalAuthenticatedProperties:
				createTotalAuthenticatedPropertiesCaller(contract),
			totalIssuedMetrics: createTotalIssuedMetrics(contract),
			contract: () => contract,
		}
	}
