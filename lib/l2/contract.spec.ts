import { ethers } from 'ethers'
import {
	createDevkitContract,
	contractFactory,
	DevkitContract,
} from './contract'
import { createMarketContract } from './market'
import { createMarketFactoryContract } from './market-factory'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createLockupContract } from './lockup/index'
import { createDevContract } from './dev'
import { createWithdrawContract } from './withdraw'
import { createRegistryContract } from './registry'
import { createPolicyContract } from './policy'
import { createMetricsContract } from './metrics'
import { createPolicyFactoryContract } from './policy-factory'
import { createSTokensContract } from './s-tokens'

describe('contract.ts', () => {
	describe('createDevkitContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: DevkitContract = {
				market: createMarketContract(provider),
				marketFactory: createMarketFactoryContract(provider),
				property: createPropertyContract(provider),
				propertyFactory: createPropertyFactoryContract(provider),
				lockup: createLockupContract(provider),
				withdraw: createWithdrawContract(provider),
				dev: createDevContract(provider),
				registry: createRegistryContract(provider),
				policy: createPolicyContract(provider),
				metrics: createMetricsContract(provider),
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
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected = createDevkitContract(provider)
			const result = contractFactory(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
