import { AgentAvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createSwapContract, SwapContract } from '../../fixtures/swap'
import type { BaseProvider } from '@ethersproject/providers'

type Results = readonly [
	undefined,
	UndefinedOr<SwapContract>,
	UndefinedOr<string>
]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

const polygonIDs = [137, 80001]

export const clientsUtilsSwapForStake = async (
	provider: BaseProvider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const detectedNetwork = AgentAvailableNetworks.find(
				({ chainId }) => chainId === net.chainId
			)
			const l2 = detectedNetwork
				? ((v: 'v2' | 'v3' | 'v2_polygon') =>
						createSwapContract(
							provider,
							v
						)(detectedNetwork.map.swap.v3 ?? detectedNetwork.map.swap.v2))(
						polygonIDs.some((id) => id === net.chainId)
							? 'v2_polygon'
							: detectedNetwork.map.swap.v3 !== undefined
							? 'v3'
							: 'v2'
				  )
				: undefined
			const results: Results = [undefined, l2, detectedNetwork?.map.weth]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
