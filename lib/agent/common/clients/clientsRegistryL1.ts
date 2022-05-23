import { l1AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createRegistryContract,
	RegistryContract,
} from '../../../ethereum/registry'
import { Provider } from '@ethersproject/abstract-provider'

const cache: WeakMap<Provider, UndefinedOr<RegistryContract>> = new WeakMap()

export const clientsRegistryL1 = async (
	provider: Provider
): Promise<UndefinedOr<RegistryContract>> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const l1Info = l1AvailableNetworks.find(
				({ chainId }) => chainId === net.chainId
			)
			const l1 = l1Info
				? createRegistryContract(provider)(l1Info.registry)
				: undefined
			const results = l1
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, l1)
			return results
		})())
	return res
}
