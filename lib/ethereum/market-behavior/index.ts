import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'
import { marketBehaviorAbi } from './abi'
import { createGetIdCaller } from './getId'
import { createGetMetricsCaller } from './getMetrics'
import { always } from 'ramda'

export type CreateMarketBehaviorContract = {
	readonly getId: (metricsAddress: string) => Promise<string>
	readonly getMetrics: (id: string) => Promise<string>
	readonly contract: () => ethers.Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMarketBehaviorContract =
	(provider: BaseProvider) =>
	(address: string): CreateMarketBehaviorContract => {
		const contract = new ethers.Contract(
			address,
			[...marketBehaviorAbi],
			provider
		)

		return {
			getId: createGetIdCaller(contract),
			getMetrics: createGetMetricsCaller(contract),
			contract: always(contract),
		}
	}
