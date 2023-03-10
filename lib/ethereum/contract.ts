/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
import { createMarketContract } from './market/index'
import { createMarketBehaviorContract } from './market-behavior/index'
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
import { createSTokensContract } from './s-tokens'
import { createMetricsGroupContract } from './metrics-group'
import { ContractRunner } from 'ethers'

export type DevkitContract = {
	readonly allocator: ReturnType<typeof createAllocatorContract>
	readonly market: ReturnType<typeof createMarketContract>
	readonly marketBehavior: ReturnType<typeof createMarketBehaviorContract>
	readonly property: ReturnType<typeof createPropertyContract>
	readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	readonly lockup: ReturnType<typeof createLockupContract>
	readonly withdraw: ReturnType<typeof createWithdrawContract>
	readonly dev: ReturnType<typeof createDevContract>
	readonly registry: ReturnType<typeof createRegistryContract>
	readonly policy: ReturnType<typeof createPolicyContract>
	readonly policyGroup: ReturnType<typeof createPolicyGroupContract>
	readonly metrics: ReturnType<typeof createMetricsContract>
	readonly metricsGroup: ReturnType<typeof createMetricsGroupContract>
	readonly policyFactory: ReturnType<typeof createPolicyFactoryContract>
	readonly sTokens: ReturnType<typeof createSTokensContract>
}
export type ContractFactory = (ethersProvider: ContractRunner) => DevkitContract
export type CreateDevkitContract = (provider: ContractRunner) => DevkitContract

export const createDevkitContract: CreateDevkitContract = (
	provider: ContractRunner
): DevkitContract => ({
	allocator: createAllocatorContract(provider),
	market: createMarketContract(provider),
	marketBehavior: createMarketBehaviorContract(provider),
	property: createPropertyContract(provider),
	propertyFactory: createPropertyFactoryContract(provider),
	lockup: createLockupContract(provider),
	withdraw: createWithdrawContract(provider),
	dev: createDevContract(provider),
	registry: createRegistryContract(provider),
	policy: createPolicyContract(provider),
	policyGroup: createPolicyGroupContract(provider),
	metrics: createMetricsContract(provider),
	metricsGroup: createMetricsGroupContract(provider),
	policyFactory: createPolicyFactoryContract(provider),
	sTokens: createSTokensContract(provider),
})

export const contractFactory: ContractFactory = createDevkitContract
