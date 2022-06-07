import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'
import { metricsAbi } from './abi'
import { createPropertyCaller } from './property'
import { createMarketCaller } from './market'
import { always } from 'ramda'

export type CreateMetricsContract = {
	readonly property: () => Promise<string>
	readonly market: () => Promise<string>
	readonly contract: () => ethers.Contract
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMetricsContract =
	(provider: BaseProvider) =>
	(address: string): CreateMetricsContract => {
		const contract = new ethers.Contract(address, [...metricsAbi], provider)

		return {
			property: createPropertyCaller(contract),
			market: createMarketCaller(contract),
			contract: always(contract),
		}
	}
