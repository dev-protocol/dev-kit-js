import Web3 from 'web3'
import { provider } from 'web3-core'
import { createMarketContract } from './market/index'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createAllocatorContract } from './allocator/index'
import { createLockupContract } from './lockup/index'
import { createDevContract } from './dev/index'
import { createWithdrawContract } from './withdraw/index'
import { createRegistryContract } from './registry/index'
import { createLockupStorageContract } from './lockup-storage'

export interface DevkitContract {
	allocator: ReturnType<typeof createAllocatorContract>
	market: ReturnType<typeof createMarketContract>
	property: ReturnType<typeof createPropertyContract>
	propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	lockup: ReturnType<typeof createLockupContract>
	lockupStorage: ReturnType<typeof createLockupStorageContract>
	withdraw: ReturnType<typeof createWithdrawContract>
	dev: ReturnType<typeof createDevContract>
	registry: ReturnType<typeof createRegistryContract>
}
export type ContractFactory = (provider: provider) => DevkitContract
export type CreateDevkitContract = (client: Web3) => DevkitContract

export const createDevkitContract: CreateDevkitContract = (
	client: Web3
): DevkitContract => ({
	allocator: createAllocatorContract(client),
	market: createMarketContract(client),
	property: createPropertyContract(client),
	propertyFactory: createPropertyFactoryContract(client),
	lockup: createLockupContract(client),
	lockupStorage: createLockupStorageContract(client),
	withdraw: createWithdrawContract(client),
	dev: createDevContract(client),
	registry: createRegistryContract(client)
})

export const contractFactory: ContractFactory = (
	provider: provider
): DevkitContract => {
	const client = new Web3(provider)

	return createDevkitContract(client)
}
