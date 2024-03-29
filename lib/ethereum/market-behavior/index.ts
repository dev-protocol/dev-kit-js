import { ContractRunner, ethers } from 'ethers'
import { marketBehaviorAbi } from './abi'
import { createGetIdCaller } from './getId'
import { createGetMetricsCaller } from './getMetrics'

export type CreateMarketBehaviorContract = {
	readonly getId: (metricsAddress: string) => Promise<string>
	readonly getMetrics: (id: string) => Promise<string>
	readonly contract: () => ethers.Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMarketBehaviorContract =
	(provider: ContractRunner) =>
	(address: string): CreateMarketBehaviorContract => {
		const contract = new ethers.Contract(
			address,
			[...marketBehaviorAbi],
			provider,
		)

		return {
			getId: createGetIdCaller(contract),
			getMetrics: createGetMetricsCaller(contract),
			contract: () => contract,
		}
	}
