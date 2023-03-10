/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
import { createMarketContract } from './market/index'
import { createMarketBehaviorContract } from './market-behavior/index'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createLockupContract } from './lockup/index'
import { createDevContract } from './dev/index'
import { createWithdrawContract } from './withdraw/index'
import { createRegistryContract } from './registry/index'
import { createPolicyContract } from './policy'
import { createMetricsContract } from './metrics'
import { createPolicyFactoryContract } from './policy-factory'
import { createSTokensContract } from './s-tokens'
import { createMarketFactoryContract } from './market-factory'
import { createMetricsFactoryContract } from './metrics-factory'
import { ContractRunner } from 'ethers'

export type DevkitContract = {
	readonly market: ReturnType<typeof createMarketContract>
	readonly marketBehavior: ReturnType<typeof createMarketBehaviorContract>
	readonly marketFactory: ReturnType<typeof createMarketFactoryContract>
	readonly property: ReturnType<typeof createPropertyContract>
	readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	readonly lockup: ReturnType<typeof createLockupContract>
	readonly withdraw: ReturnType<typeof createWithdrawContract>
	readonly dev: ReturnType<typeof createDevContract>
	readonly registry: ReturnType<typeof createRegistryContract>
	readonly policy: ReturnType<typeof createPolicyContract>
	readonly metrics: ReturnType<typeof createMetricsContract>
	readonly metricsFactory: ReturnType<typeof createMetricsFactoryContract>
	readonly policyFactory: ReturnType<typeof createPolicyFactoryContract>
	readonly sTokens: ReturnType<typeof createSTokensContract>
}
export type ContractFactory = (ethersProvider: ContractRunner) => DevkitContract
export type CreateDevkitContract = (provider: ContractRunner) => DevkitContract

export const createDevkitContract: CreateDevkitContract = (
	provider: ContractRunner
): DevkitContract => ({
	market: createMarketContract(provider),
	marketBehavior: createMarketBehaviorContract(provider),
	marketFactory: createMarketFactoryContract(provider),
	property: createPropertyContract(provider),
	propertyFactory: createPropertyFactoryContract(provider),
	lockup: createLockupContract(provider),
	withdraw: createWithdrawContract(provider),
	dev: createDevContract(provider),
	registry: createRegistryContract(provider),
	policy: createPolicyContract(provider),
	metrics: createMetricsContract(provider),
	metricsFactory: createMetricsFactoryContract(provider),
	policyFactory: createPolicyFactoryContract(provider),
	sTokens: createSTokensContract(provider),
})

export const contractFactory: ContractFactory = createDevkitContract
