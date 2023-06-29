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

const polygonIDs = [137, 80001]

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
            
        })())
    return res
}