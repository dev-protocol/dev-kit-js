import { addresses } from '../../addresses'
import {
	createLockupContract,
	LockupContract,
} from '../../ethereum/lockup/index'
import { createDevkitContract } from '../../ethereum/contract'
import { Provider } from '@ethersproject/abstract-provider'

export const getLockupAddress = async (
	chainId: number,
	provider: Provider
): Promise<string> => {
	const lockupAddress =
		chainId === 1
			? await createDevkitContract(provider)
					.registry(addresses.eth['main'].registry)
					['lockup']()
			: chainId === 3
			? await createDevkitContract(provider)
					.registry(addresses.eth['ropsten'].registry)
					['lockup']()
			: chainId === 42161
			? addresses.arbitrum.one.lockup
			: addresses.arbitrum.rinkeby.lockup

	return lockupAddress
}

const cacheLockupContract = new WeakMap()

export const getLockupContract = async (
	provider: Provider
): Promise<LockupContract> => {
	const network = await provider.getNetwork()

	// eslint-disable-next-line functional/no-conditional-statement
	if (cacheLockupContract.has(network)) {
		return cacheLockupContract.get(network)
	} else {
		const chainId = network.chainId
		const lockupContract =
			chainId === 1 || chainId === 3
				? createLockupContract(provider)
				: createLockupContract(provider) // we do not have function for L2.

		const lockupAddress = await getLockupAddress(chainId, provider)
		const deployedLockupContract = await lockupContract(lockupAddress)

		// eslint-disable-next-line functional/no-expression-statement
		cacheLockupContract.set(network, deployedLockupContract)
		return deployedLockupContract
	}
}
