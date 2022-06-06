import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createPropertyContract,
	PropertyContract,
} from '../../../ethereum/property'
import {
	createPropertyContract as createPropertyContractL2,
	PropertyContract as PropertyContractL2,
} from '../../../l2/property'
import { Provider } from '@ethersproject/abstract-provider'
import { clientsRegistry } from './clientsRegistry'

type Results = readonly [
	UndefinedOr<PropertyContract>,
	UndefinedOr<PropertyContractL2>
]

// eslint-disable-next-line functional/prefer-readonly-type
const cache: WeakMap<Provider, Map<string, Results>> = new WeakMap()

export const clientsProperty = async (
	provider: Provider,
	tokenAddress: string
): Promise<Results> => {
	const res =
		cache.get(provider)?.get(tokenAddress) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createPropertyContract(provider)(tokenAddress)
				: undefined
			const l2 = ((data) =>
				data ? createPropertyContractL2(provider)(tokenAddress) : undefined)(
				l2AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results: Results = [l1, l2]
			const map = cache.get(provider)
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(
				provider,
				map
					? map.set(tokenAddress, results)
					: new Map([[tokenAddress, results]])
			)
			return results
		})())
	return res
}
