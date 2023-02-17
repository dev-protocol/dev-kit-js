import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr, whenDefined } from '@devprotocol/util-ts'
import { clientsMetricsFactory } from './common/clients/clientsMetricsFactory'
import { createMetricsContract } from '../ethereum/metrics'
import { createMarketContract } from '../ethereum/market'
import { createMarketBehaviorContract } from '../ethereum/market-behavior'
import { flatten, toPairs, unnest, values } from 'ramda'
import { marketAddresses } from '../marketAddresses'

type Asset = {
	readonly market: string
	readonly marketSlug?: string
	readonly id: string
}

type PropertiesAssets = (options: {
	readonly provider: BaseProvider
	readonly destination: string
}) => Promise<UndefinedOr<readonly Asset[]>>

export const propertiesAssets: PropertiesAssets = async (options) => {
	const marketSet = unnest(
		flatten(values(marketAddresses).map(values)).map(toPairs)
	) as ReadonlyArray<readonly [string, string]>
	const [, metricsFactory] = await clientsMetricsFactory(options.provider)
	const metricsContract = createMetricsContract(options.provider)
	const marketContract = createMarketContract(options.provider)
	const marketBehaviorContract = createMarketBehaviorContract(options.provider)

	const listOfMetrics = await whenDefined(metricsFactory, (c) =>
		c.metricsOfProperty(options.destination)
	)
	const listOfMetricsContract = await whenDefined(listOfMetrics, (x) =>
		Promise.all(x.map(metricsContract))
	)
	const listOfMarketContract = await whenDefined(listOfMetricsContract, (m) =>
		Promise.all(
			m.map(async (metrics) => ({
				metrics,
				market: marketContract(await metrics.market()),
			}))
		)
	)
	const marketBehaviors = await whenDefined(listOfMarketContract, (m) =>
		Promise.all(
			m.map(async (cont) => ({
				marketBehavior: marketBehaviorContract(await cont.market.behavior()),
				...cont,
			}))
		)
	)
	const results = await whenDefined(marketBehaviors, (mb) =>
		Promise.all(
			mb.map(async (cont) => {
				const metrics = cont.metrics.contract().address
				const market = cont.market.contract().address
				const marketSlug = marketSet.find(([, addr]) => addr === market)?.[0]
				return {
					id: await cont.marketBehavior.getId(metrics),
					market,
					marketSlug,
				}
			})
		)
	)

	return results
}
