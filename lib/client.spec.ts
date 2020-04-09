import { createDevkitContract, contractFactory, DevkitContract } from './client'
import { createAllocatorContract } from './allocator/index'
import { createMarketContract } from './market'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createLockupContract } from './lockup/index'
import Web3 from 'web3'
import { createDevContract } from './dev'
import { createWithdrawContract } from './withdraw'
import { createRegistryContract } from './registry'

describe('client.ts', () => {
	describe('createDevkitContract', () => {
		it('check return object', () => {
			const host = 'localhost'

			const client = new Web3()

			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: DevkitContract = {
				allocator: createAllocatorContract(client),
				market: createMarketContract(client),
				property: createPropertyContract(client),
				propertyFactory: createPropertyFactoryContract(client),
				lockup: createLockupContract(client),
				withdraw: createWithdrawContract(client),
				dev: createDevContract(client),
				registry: createRegistryContract(client)
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
