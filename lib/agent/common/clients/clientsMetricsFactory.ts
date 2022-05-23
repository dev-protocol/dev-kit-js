import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createMetricsFactoryContract as createMetricsFactoryContractL2,
	MetricsFactoryContract as MetricsFactoryContractL2,
} from '../../../l2/metrics-factory'
import { Provider } from '@ethersproject/abstract-provider'

type Results = readonly [undefined, UndefinedOr<MetricsFactoryContractL2>]

const cache: WeakMap<Provider, Results> = new WeakMap()

export const clientsMetricsFactory = async (
	provider: Provider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const l1 = undefined
			const l2 = ((data) =>
				data
					? createMetricsFactoryContractL2(provider)(data.map.metricsFactory)
					: undefined)(
				l2AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
