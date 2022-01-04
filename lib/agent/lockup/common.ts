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
import { Network } from '@ethersproject/networks'
import { Wallet } from 'ethers'

const cacheLockupContract = new WeakMap()

export const getLockupContract = async (
	wallet: Wallet
): Promise<LockupContract | LockupContractL2 | undefined> => {
	const network = await wallet.provider.getNetwork()
	return cacheLockupContract.has(network)
		? cacheLockupContract.get(network)
		: generateLockupContract(wallet)
}

const generateLockupContract = async (
	wallet: Wallet
): Promise<LockupContract | LockupContractL2 | undefined> => {
	const provider = wallet.provider
	const network = await provider.getNetwork()
	const chainId = network.chainId
	const lockupContract = (await isL1(chainId))
		? createLockupContract(wallet)
		: createLockupContractL2(wallet)

	const lockupAddress = (await isL1(chainId))
		? await getL1ContractAddress(provider, 'lockup')
		: await getL2ContractAddress(provider, 'lockup')

	return lockupAddress
		? setCacheLockupContract(lockupContract, lockupAddress, network)
		: undefined
}

type LockupL1 = (address: string) => LockupContract
type LockupL2 = (address: string) => LockupContractL2

const setCacheLockupContract = async (
	lockupContract: LockupL1 | LockupL2,
	lockupAddress: string,
	network: Network
) => {
	const deployedLockupContract = await lockupContract(lockupAddress)
	// eslint-disable-next-line functional/no-expression-statement
	cacheLockupContract.set(network, deployedLockupContract)
	return deployedLockupContract
}
