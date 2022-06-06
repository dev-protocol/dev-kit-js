import { l1AvailableNetworks, l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createRegistryContract,
	RegistryContract,
} from '../../../ethereum/registry'
import {
	createRegistryContract as createRegistryContractL2,
	RegistryContract as RegistryContractL2,
} from '../../../l2/registry'
import { Provider } from '@ethersproject/abstract-provider'

type Results = readonly [
	UndefinedOr<RegistryContract>,
	UndefinedOr<RegistryContractL2>
]

const cache: WeakMap<Provider, Results> = new WeakMap()

export const clientsRegistry = async (provider: Provider): Promise<Results> => {
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
			const l2 = ((data) =>
				data
					? createRegistryContractL2(provider)(data.map.registry)
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
