import { AgentAvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createSwapUsdcContract, SwapUsdcContract } from '../../fixtures/swap-usdc'
import type { BaseProvider } from '@ethersproject/providers'

type Results = readonly [
	undefined,
	UndefinedOr<SwapUsdcContract>,
	UndefinedOr<string>
]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsUtilsSwapUsdcForStake = async (
    provider: BaseProvider
): Promise<Results> => {
    const res =
        cache.get(provider) ??
        (await (async () => {
            const net = await provider.getNetwork()
            const detectedNetwork = AgentAvailableNetworks.find(
                ({ chainId }) => chainId === net.chainId
            )
            const cont = detectedNetwork
                ? createSwapUsdcContract(
                            provider
                        )(detectedNetwork.map.swapUsdc?.swap || '')
                : undefined
            const results: Results = [undefined, cont, detectedNetwork?.map.swapUsdc?.usdc]
            // eslint-disable-next-line functional/no-expression-statement
            cache.set(provider, results)
            return results
        })())
    return res
}