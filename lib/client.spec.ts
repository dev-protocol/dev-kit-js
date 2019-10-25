import { createDevkitContract, contractFactory, DevkitContract } from './client'
import { createMarketContract } from './market'
import Web3 from 'web3'

describe('client.ts', () => {
	describe('createDevkitContract', () => {
		it('check return object', () => {
			const host = 'localhost'

			const client = new Web3()

			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: DevkitContract = {
				market: createMarketContract(client)
			}

			const result = createDevkitContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})

	describe('contractFactory', () => {
		it('check return object', () => {
			const host = 'localhost'

			const client = new Web3()

			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected = createDevkitContract(client)

			const result = contractFactory(host)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
