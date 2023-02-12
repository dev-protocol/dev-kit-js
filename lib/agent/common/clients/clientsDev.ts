import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createDevContract, DevContract } from '../../../ethereum/dev'
import {
	createDevContract as createDevContractL2,
	DevContract as DevContractL2,
} from '../../../l2/dev'
import type { BaseProvider } from '@ethersproject/providers'
import { clientsRegistry } from './clientsRegistry'

type Results = readonly [UndefinedOr<DevContract>, UndefinedOr<DevContractL2>]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsDev = async (provider: BaseProvider): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const [registry] = await clientsRegistry(provider)
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
