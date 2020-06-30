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
import { createPolicyContract } from './policy'

export type DevkitContract = {
	readonly allocator: ReturnType<typeof createAllocatorContract>
	readonly market: ReturnType<typeof createMarketContract>
	readonly property: ReturnType<typeof createPropertyContract>
	readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	readonly lockup: ReturnType<typeof createLockupContract>
	readonly lockupStorage: ReturnType<typeof createLockupStorageContract>
	readonly withdraw: ReturnType<typeof createWithdrawContract>
	readonly dev: ReturnType<typeof createDevContract>
	readonly registry: ReturnType<typeof createRegistryContract>
	readonly policy: ReturnType<typeof createPolicyContract>
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
	registry: createRegistryContract(client),
	policy: createPolicyContract(client),
})

export const contractFactory: ContractFactory = (
	provider: provider
): DevkitContract => {
	const client = new Web3(provider)

	return createDevkitContract(client)
}
