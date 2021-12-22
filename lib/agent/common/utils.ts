import { networks } from './const'
import { addresses } from '../../addresses'
import {
	createRegistryContract,
	RegistryContract,
} from '../../ethereum/registry/index'
import { Provider } from '@ethersproject/abstract-provider'

export const isL1 = (chainId: number): boolean => {
	return chainId === networks.ethereum.main ||
		chainId === networks.ethereum.ropsten
		? true
		: false
}

export const getL1ContractAddress = async (
	provider: Provider,
	contract: any
): Promise<string> => {
	const chainId = (await provider.getNetwork()).chainId
	const registry = await createRegistryContract(provider)

	const key: keyof RegistryContract = contract

	const lockupAddress =
		chainId === networks.ethereum.main
			? await registry(addresses.eth['main'].registry)[key]()
			: await registry(addresses.eth['ropsten'].registry)[key]()

	return lockupAddress
}

export const getL2ContractAddress = async (
	provider: Provider,
	contract: any
): Promise<string> => {
	const chainId = (await provider.getNetwork()).chainId

	const arbOneKey: keyof typeof addresses.arbitrum.one = contract
	const arbRinkebyKey: keyof typeof addresses.arbitrum.rinkeby = contract

	const lockupAddress =
		chainId === networks.arbitrum.one
			? addresses.arbitrum.one[arbOneKey]
			: addresses.arbitrum.rinkeby[arbRinkebyKey]

	return lockupAddress
}
