/* eslint-disable functional/no-conditional-statement */
import {
	getL1ContractAddress,
	getL2ContractAddress,
	isL1,
} from '../common/utils'
import {
	createLockupContract,
	LockupContract,
} from '../../ethereum/lockup/index'
import {
	createLockupContract as createLockupContractL2,
	LockupContract as LockupContractL2,
} from '../../l2/lockup/index'
import { Provider } from '@ethersproject/abstract-provider'

const cacheLockupContract = new WeakMap()

export const getLockupContract = async (
	provider: Provider
): Promise<LockupContract | LockupContractL2 | null> => {
	const network = await provider.getNetwork()

	// eslint-disable functional/no-conditional-statement
	if (cacheLockupContract.has(network)) {
		return cacheLockupContract.get(network)
	} else {
		const chainId = network.chainId
		const lockupContract = (await isL1(chainId))
			? createLockupContract(provider)
			: createLockupContractL2(provider)

		const lockupAddress = (await isL1(chainId))
			? await getL1ContractAddress(provider, 'lockup')
			: await getL2ContractAddress(provider, 'lockup')

		if (!lockupAddress) {
			return null
		}

		const deployedLockupContract = await lockupContract(lockupAddress)
		// eslint-disable-next-line functional/no-expression-statement
		cacheLockupContract.set(network, deployedLockupContract)
		return deployedLockupContract
	}
}
