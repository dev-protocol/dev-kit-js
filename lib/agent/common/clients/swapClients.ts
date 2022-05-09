import { AgentAvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createSwapContract, SwapContract
} from '../../fixtures/swap'
import { Provider } from '@ethersproject/abstract-provider'

const cache: WeakMap<Provider, UndefinedOr<SwapContract>> = new WeakMap()

export const swapClients = async (provider: Provider): Promise<UndefinedOr<SwapContract>> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const l2 = ((data) =>
				data ? createSwapContract(provider)(data.map.swap) : undefined)(
				AgentAvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results = l2
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
