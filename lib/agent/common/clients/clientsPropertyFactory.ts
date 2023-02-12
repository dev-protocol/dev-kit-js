import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createPropertyFactoryContract,
	PropertyFactoryContract,
} from '../../../ethereum/property-factory'
import {
	createPropertyFactoryContract as createPropertyFactoryContractL2,
	PropertyFactoryContract as PropertyFactoryContractL2,
} from '../../../l2/property-factory'
import type { BaseProvider } from '@ethersproject/providers'
import { clientsRegistry } from './clientsRegistry'

type Results = readonly [
	UndefinedOr<PropertyFactoryContract>,
	UndefinedOr<PropertyFactoryContractL2>
]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsPropertyFactory = async (
	provider: BaseProvider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createPropertyFactoryContract(provider)(
						await registry.propertyFactory()
				  )
				: undefined
			const l2 = ((data) =>
				data
					? createPropertyFactoryContractL2(provider)(data.map.propertyFactory)
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
