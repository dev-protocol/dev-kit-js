import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
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
	(provider: Provider | Signer) =>
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
