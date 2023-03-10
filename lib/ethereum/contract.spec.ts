import { ethers } from 'ethers'
import {
	createDevkitContract,
	contractFactory,
	DevkitContract,
} from './contract'
import { createAllocatorContract } from './allocator/index'
import { createMarketContract } from './market'
import { createMarketBehaviorContract } from './market-behavior'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createLockupContract } from './lockup/index'
import { createDevContract } from './dev'
import { createWithdrawContract } from './withdraw'
import { createRegistryContract } from './registry'
import { createPolicyContract } from './policy'
import { createPolicyGroupContract } from './policy-group'
import { createMetricsContract } from './metrics'
import { createPolicyFactoryContract } from './policy-factory'
import { createSTokensContract } from './s-tokens'
import { createMetricsGroupContract } from './metrics-group'

describe('contract.ts', () => {
	describe('createDevkitContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: DevkitContract = {
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
			}

			const result = createDevkitContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})

	describe('contractFactory', () => {
		it('check return object', () => {
			const host = 'localhost'
			const provider = new ethers.JsonRpcProvider(host)

			const expected = createDevkitContract(provider)
			const result = contractFactory(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
