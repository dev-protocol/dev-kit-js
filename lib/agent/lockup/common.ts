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
): Promise<LockupContract | LockupContractL2 | undefined> => {
	const network = await provider.getNetwork()
	return cacheLockupContract.has(network)
		? cacheLockupContract.get(network)
		: generateLockupContract(provider)
}

const generateLockupContract = async (
	provider: Provider
): Promise<LockupContract | LockupContractL2 | undefined> => {
	const network = await provider.getNetwork()
	const chainId = network.chainId
	const lockupContract = (await isL1(chainId))
		? createLockupContract(provider)
		: createLockupContractL2(provider)

	const lockupAddress = (await isL1(chainId))
		? await getL1ContractAddress(provider, 'lockup')
		: await getL2ContractAddress(provider, 'lockup')

	// eslint-disable-next-line functional/no-conditional-statement
	if (!lockupAddress) {
		return undefined
	}

	const deployedLockupContract = await lockupContract(lockupAddress)
	// eslint-disable-next-line functional/no-expression-statement
	cacheLockupContract.set(network, deployedLockupContract)
	return deployedLockupContract
}
