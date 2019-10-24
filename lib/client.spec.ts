import { devkitContract, contractFactory } from './client'
import Web3 from 'web3'

describe('client.ts', () => {
	describe('contractFactory', () => {
		it('check return object', () => {
			const host = 'localhost'

			const client = new Web3()

			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected = devkitContract(client)

			const result = contractFactory(host)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
