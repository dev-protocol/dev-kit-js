import Web3 from 'web3'
import {
	createDevkitContract,
	contractFactory,
	DevkitContract,
} from './contract'
import { createMarketContract } from './market'
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

			const client = new Web3()

			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: DevkitContract = {
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
			}

			const result = createDevkitContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})

	describe('contractFactory', () => {
		it('check return object', () => {
			const client = new Web3()

			client.setProvider(new Web3.providers.HttpProvider('localhost'))

			const expected = createDevkitContract(client)

			const result = contractFactory(client.currentProvider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
