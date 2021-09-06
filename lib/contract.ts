/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { createMarketContract } from './market/index'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createAllocatorContract } from './allocator/index'
import { createLockupContract } from './lockup/index'
import { createDevContract } from './dev/index'
import { createWithdrawContract } from './withdraw/index'
import { createRegistryContract } from './registry/index'
import { createPolicyContract } from './policy'
import { createPolicyGroupContract } from './policy-group'
import { createMetricsContract } from './metrics'
import { createPolicyFactoryContract } from './policy-factory'

export type DevkitContract = {
	readonly allocator: ReturnType<typeof createAllocatorContract>
	readonly market: ReturnType<typeof createMarketContract>
	readonly property: ReturnType<typeof createPropertyContract>
	readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	readonly lockup: ReturnType<typeof createLockupContract>
	readonly withdraw: ReturnType<typeof createWithdrawContract>
	readonly dev: ReturnType<typeof createDevContract>
	readonly registry: ReturnType<typeof createRegistryContract>
	readonly policy: ReturnType<typeof createPolicyContract>
	readonly policyGroup: ReturnType<typeof createPolicyGroupContract>
	readonly metrics: ReturnType<typeof createMetricsContract>
	readonly policyFactory: ReturnType<typeof createPolicyFactoryContract>
}
export type ContractFactory = (
	ethersProvider: Provider | Signer
) => DevkitContract
export type CreateDevkitContract = (
	provider: Provider | Signer
) => DevkitContract

// ここをethers.jsで実装した処理の関数に差し替える
export const createDevkitContract: CreateDevkitContract = (
	provider: Provider | Signer
): DevkitContract => ({
	allocator: createAllocatorContract(provider),
	market: createMarketContract(provider),
	property: createPropertyContract(provider),
	propertyFactory: createPropertyFactoryContract(provider),
	lockup: createLockupContract(provider),
	withdraw: createWithdrawContract(provider),
	dev: createDevContract(provider),
	registry: createRegistryContract(provider),
	policy: createPolicyContract(provider),
	policyGroup: createPolicyGroupContract(provider),
	metrics: createMetricsContract(provider),
	policyFactory: createPolicyFactoryContract(provider),
})

export const contractFactory: ContractFactory = createDevkitContract
