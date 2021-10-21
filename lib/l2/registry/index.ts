import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { addressRegistryAbi } from './abi'
import { createRegistriesCaller } from './registries'

export type RegistryContract = {
	readonly registries: (key: string) => Promise<string>
}

export type CreateRegistryContract = (
	provider: Provider | Signer
) => (address: string) => RegistryContract

export const createRegistryContract: CreateRegistryContract =
	(provider: Provider | Signer) =>
	(address: string): RegistryContract => {
		const contract = new ethers.Contract(
			address,
			[...addressRegistryAbi],
			provider
		)

		return {
			registries: createRegistriesCaller(contract),
		}
	}
