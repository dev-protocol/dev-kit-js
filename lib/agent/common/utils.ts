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

type RegistryContractKeys = keyof RegistryContract

export const getL1ContractAddress = async (
	provider: Provider,
	contract: RegistryContractKeys
): Promise<string | undefined> => {
	const chainId = (await provider.getNetwork()).chainId
	const registry = await createRegistryContract(provider)

	const lockupAddress =
		chainId === networks.ethereum.main
			? await registry(addresses.eth['main'].registry)[contract]()
			: chainId === networks.ethereum.ropsten
			? await registry(addresses.eth['ropsten'].registry)[contract]()
			: undefined

	return lockupAddress
}

type ArbOneKey = keyof typeof addresses.arbitrum.one
type ArbRinkebyKey = keyof typeof addresses.arbitrum.rinkeby

export const getL2ContractAddress = async (
	provider: Provider,
	contract: ArbOneKey | ArbRinkebyKey
): Promise<string | undefined> => {
	const chainId = (await provider.getNetwork()).chainId

	const lockupAddress =
		chainId === networks.arbitrum.one
			? addresses.arbitrum.one[contract]
			: chainId === networks.arbitrum.rinkeby
			? addresses.arbitrum.rinkeby[contract]
			: undefined

	return lockupAddress
}
