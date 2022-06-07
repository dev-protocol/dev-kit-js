import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'
import { addressRegistryAbi } from './abi'
import { createRegistriesCaller } from './registries'
import { always } from 'ramda'

export type RegistryContract = {
	readonly registries: (key: string) => Promise<string>
	readonly contract: () => ethers.Contract
}

export type CreateRegistryContract = (
	provider: BaseProvider
) => (address: string) => RegistryContract

export const createRegistryContract: CreateRegistryContract =
	(provider: BaseProvider) =>
	(address: string): RegistryContract => {
		const contract = new ethers.Contract(
			address,
			[...addressRegistryAbi],
			provider
		)

		return {
			registries: createRegistriesCaller(contract),
			contract: always(contract),
		}
	}
