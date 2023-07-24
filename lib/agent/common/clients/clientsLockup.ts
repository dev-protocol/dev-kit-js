import { l2AvailableNetworks } from '../const'
import type { UndefinedOr } from '@devprotocol/util-ts'
import { createLockupContract, LockupContract } from '../../../ethereum/lockup'
import {
	createLockupContract as createLockupContractL2,
	LockupContract as LockupContractL2,
} from '../../../l2/lockup'
import { clientsRegistry } from './clientsRegistry'
import { ContractRunner } from 'ethers'

type Results = readonly [
	UndefinedOr<LockupContract>,
	UndefinedOr<LockupContractL2>,
]

const cache: WeakMap<ContractRunner, Results> = new WeakMap()

export const clientsLockup = async (
	provider: ContractRunner,
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const net = await provider.provider?.getNetwork()
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createLockupContract(provider)(await registry.lockup())
				: undefined
			const l2 = ((data) =>
				data ? createLockupContractL2(provider)(data.map.lockup) : undefined)(
				l2AvailableNetworks.find(
					({ chainId }) => chainId === Number(net?.chainId),
				),
			)
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
