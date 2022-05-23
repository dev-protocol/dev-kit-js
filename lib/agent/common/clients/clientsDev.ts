import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createDevContract, DevContract } from '../../../ethereum/dev'
import {
	createDevContract as createDevContractL2,
	DevContract as DevContractL2,
} from '../../../l2/dev'
import { Provider } from '@ethersproject/abstract-provider'
import { clientsRegistryL1 } from './clientsRegistryL1'

type Results = readonly [UndefinedOr<DevContract>, UndefinedOr<DevContractL2>]

const cache: WeakMap<Provider, Results> = new WeakMap()

export const clientsDev = async (provider: Provider): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const registry = await clientsRegistryL1(provider)
			const l1 = registry
				? createDevContract(provider)(await registry.token())
				: undefined
			const l2 = ((data) =>
				data ? createDevContractL2(provider)(data.map.token) : undefined)(
				l2AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
