import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createLockupContract, LockupContract } from '../../../ethereum/lockup'
import {
	createLockupContract as createLockupContractL2,
	LockupContract as LockupContractL2,
} from '../../../l2/lockup'
import type { BaseProvider } from '@ethersproject/providers'
import { clientsRegistry } from './clientsRegistry'

type Results = readonly [
	UndefinedOr<LockupContract>,
	UndefinedOr<LockupContractL2>
]

const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsLockup = async (
	provider: BaseProvider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createLockupContract(provider)(await registry.lockup())
				: undefined
			const l2 = ((data) =>
				data ? createLockupContractL2(provider)(data.map.lockup) : undefined)(
				l2AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
