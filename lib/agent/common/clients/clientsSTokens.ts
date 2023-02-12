import { l1AvailableNetworks, l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createSTokensContract,
	STokensContract,
} from '../../../ethereum/s-tokens'
import {
	createSTokensContract as createSTokensContractL2,
	STokensContract as STokensContractL2,
} from '../../../l2/s-tokens'
import type { BaseProvider } from '@ethersproject/providers'
import { addresses } from '../../../addresses'

type Results = readonly [
	UndefinedOr<STokensContract>,
	UndefinedOr<STokensContractL2>
]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsSTokens = async (
	provider: BaseProvider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const l1 = ((data) =>
				data
					? createSTokensContract(provider)(
							data.chainId === 1
								? addresses.eth.main.sTokens
								: addresses.eth.ropsten.sTokens
					  )
					: undefined)(
				l1AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const l2 = ((data) =>
				data ? createSTokensContractL2(provider)(data.map.sTokens) : undefined)(
				l2AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
