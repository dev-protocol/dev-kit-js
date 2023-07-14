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
import { clientsRegistry } from './clientsRegistry'
import { ContractRunner } from 'ethers'

type Results = readonly [
	UndefinedOr<MarketFactoryContract>,
	UndefinedOr<MarketFactoryContractL2>
]

const cache: WeakMap<ContractRunner, Results> = new WeakMap()

export const clientsMarketFactory = async (
	provider: ContractRunner
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.provider?.getNetwork()
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createMarketFactoryContract(provider)(await registry.marketFactory())
				: undefined
			const l2 = ((data) =>
				data
					? createMarketFactoryContractL2(provider)(data.map.marketFactory)
					: undefined)(
				l2AvailableNetworks.find(
					({ chainId }) => chainId === Number(net?.chainId)
				)
			)
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
