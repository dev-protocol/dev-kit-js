import { AgentAvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createSwapArbitraryTokensContract,
	SwapArbitraryTokensContract,
} from '../../fixtures/swap-arbitrary-tokens'
import type { ContractRunner } from 'ethers'

type Results = readonly [undefined, UndefinedOr<SwapArbitraryTokensContract>]

const cache: WeakMap<ContractRunner, Results> = new WeakMap()

export const clientsUtilsSwapTokensForStake = async (
	provider: ContractRunner,
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.provider?.getNetwork()
			const detectedNetwork = AgentAvailableNetworks.find(
				({ chainId }) => chainId === Number(net?.chainId),
			)
			const cont = detectedNetwork
				? createSwapArbitraryTokensContract(provider)(
						detectedNetwork.map.swapArbitraryTokens?.swap || '',
				  )
				: undefined
			const results: Results = [undefined, cont]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
