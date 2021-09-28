/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { provider } from 'web3-core'
import { createMarketContract } from './market/index'
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

export type DevkitContract = {
	readonly market: ReturnType<typeof createMarketContract>
	readonly property: ReturnType<typeof createPropertyContract>
	readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	readonly lockup: ReturnType<typeof createLockupContract>
	readonly withdraw: ReturnType<typeof createWithdrawContract>
	readonly dev: ReturnType<typeof createDevContract>
	readonly registry: ReturnType<typeof createRegistryContract>
	readonly policy: ReturnType<typeof createPolicyContract>
	readonly metrics: ReturnType<typeof createMetricsContract>
	readonly policyFactory: ReturnType<typeof createPolicyFactoryContract>
	readonly sTokens: ReturnType<typeof createSTokensContract>
}
export type ContractFactory = (provider: provider) => DevkitContract
export type CreateDevkitContract = (client: Web3) => DevkitContract

export const createDevkitContract: CreateDevkitContract = (
	client: Web3
): DevkitContract => ({
	market: createMarketContract(client),
	property: createPropertyContract(client),
	propertyFactory: createPropertyFactoryContract(client),
	lockup: createLockupContract(client),
	withdraw: createWithdrawContract(client),
	dev: createDevContract(client),
	registry: createRegistryContract(client),
	policy: createPolicyContract(client),
	metrics: createMetricsContract(client),
	policyFactory: createPolicyFactoryContract(client),
	sTokens: createSTokensContract(client),
})

export const contractFactory: ContractFactory = (
	provider: provider
): DevkitContract => {
	const client = new Web3(provider)

	return createDevkitContract(client)
}
