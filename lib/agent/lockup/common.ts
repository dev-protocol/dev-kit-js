import { addresses } from '../../addresses'
import {
	isMainNet,
	getL1ContractAddress,
	getL2ContractAddress,
} from '../common/utils'
import { networks } from '../common/const'
import {
	createLockupContract,
	LockupContract,
} from '../../ethereum/lockup/index'
import {
	createLockupContract as createLockupContractL2,
	LockupContract as LockupContractL2,
} from '../../l2/lockup/index'
import { createRegistryContract } from '../../ethereum/registry/index'
import { Provider } from '@ethersproject/abstract-provider'

// export const getLockupAddress = async (provider: Provider): Promise<string> => {
// 	const chainId = (await provider.getNetwork()).chainId
// 	const registry = await createRegistryContract(provider)
// 	const lockupAddress =
// 		chainId === networks.ethereum.main
// 			? registry(addresses.eth['main'].registry).lockup()
// 			: chainId === networks.ethereum.ropsten
// 			? registry(addresses.eth['ropsten'].registry).lockup()
// 			: chainId === networks.arbitrum.one
// 			? addresses.arbitrum.one.lockup
// 			: addresses.arbitrum.rinkeby.lockup

// 	return lockupAddress
// }

const cacheLockupContract = new WeakMap()

export const getLockupContract = async (
	provider: Provider
): Promise<LockupContract | LockupContractL2> => {
	const network = await provider.getNetwork()

	// eslint-disable-next-line functional/no-conditional-statement
	if (cacheLockupContract.has(network)) {
		return cacheLockupContract.get(network)
	} else {
		const chainId = network.chainId
		const lockupContract =
			chainId === networks.ethereum.main ||
			chainId === networks.ethereum.ropsten
				? createLockupContract(provider)
				: createLockupContractL2(provider)

		const lockupAddress = (await isMainNet(chainId))
			? await getL1ContractAddress(provider, 'lockup')
			: await getL2ContractAddress(provider, 'lockup')

		const deployedLockupContract = await lockupContract(lockupAddress)

		// eslint-disable-next-line functional/no-expression-statement
		cacheLockupContract.set(network, deployedLockupContract)
		return deployedLockupContract
	}
}
