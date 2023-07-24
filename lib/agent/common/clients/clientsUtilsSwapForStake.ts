import { AgentAvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createSwapContract, SwapContract } from '../../fixtures/swap'
import { ContractRunner } from 'ethers'

type Results = readonly [
	undefined,
	UndefinedOr<SwapContract>,
	UndefinedOr<string>,
]

const cache: WeakMap<ContractRunner, Results> = new WeakMap()

const polygonIDs = [137, 80001]

export const clientsUtilsSwapForStake = async (
	provider: ContractRunner,
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.provider?.getNetwork()
			const detectedNetwork = AgentAvailableNetworks.find(
				({ chainId }) => chainId === Number(net?.chainId),
			)
			const l2 = detectedNetwork
				? ((v: 'v2' | 'v3' | 'v3_polygon') =>
						createSwapContract(
							provider,
							v,
						)(detectedNetwork.map.swap.v3 ?? detectedNetwork.map.swap.v2))(
						polygonIDs.some((id) => id === Number(net?.chainId))
							? 'v3_polygon'
							: detectedNetwork.map.swap.v3 !== undefined
							? 'v3'
							: 'v2',
				  )
				: undefined
			const results: Results = [undefined, l2, detectedNetwork?.map.weth]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
