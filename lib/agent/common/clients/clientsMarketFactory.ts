import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createMarketFactoryContract,
	MarketFactoryContract,
} from '../../../ethereum/market-factory'
import {
	createMarketFactoryContract as createMarketFactoryContractL2,
	MarketFactoryContract as MarketFactoryContractL2,
} from '../../../l2/market-factory'
import type { BaseProvider } from '@ethersproject/providers'
import { clientsRegistry } from './clientsRegistry'

type Results = readonly [
	UndefinedOr<MarketFactoryContract>,
	UndefinedOr<MarketFactoryContractL2>
]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsMarketFactory = async (
	provider: BaseProvider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createMarketFactoryContract(provider)(await registry.marketFactory())
				: undefined
			const l2 = ((data) =>
				data
					? createMarketFactoryContractL2(provider)(data.map.marketFactory)
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
