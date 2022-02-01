import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createLockupContract, LockupContract } from '../../../ethereum/lockup'
import {
	createLockupContract as createLockupContractL2,
	LockupContract as LockupContractL2,
} from '../../../l2/lockup'
import { Provider } from '@ethersproject/abstract-provider'
import { registryClientL1 } from './registryClientL1'

const cache: WeakMap<
	Provider,
	readonly [UndefinedOr<LockupContract>, UndefinedOr<LockupContractL2>]
> = new WeakMap()

export const lockupClients = async (
	provider: Provider
): Promise<
	readonly [UndefinedOr<LockupContract>, UndefinedOr<LockupContractL2>]
> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.getNetwork()
			const registry = await registryClientL1(provider)
			const l1 = registry
				? createLockupContract(provider)(await registry.lockup())
				: undefined
			const l2 = ((data) =>
				data ? createLockupContractL2(provider)(data.map.lockup) : undefined)(
				l2AvailableNetworks.find(({ chainId }) => chainId === net.chainId)
			)
			const results: readonly [
				UndefinedOr<LockupContract>,
				UndefinedOr<LockupContractL2>
			] = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
