import { ContractRunner, ethers } from 'ethers'
import { addressRegistryAbi } from './abi'
import { createRegistriesCaller } from './registries'
import { always } from 'ramda'

export type RegistryContract = {
	readonly registries: (key: string) => Promise<string>
	readonly contract: () => ethers.Contract
}

export type CreateRegistryContract = (
	provider: ContractRunner
) => (address: string) => RegistryContract

export const createRegistryContract: CreateRegistryContract =
	(provider: ContractRunner) =>
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
