import Web3 from 'web3'
import { getAccount } from './getAccount'

describe('getAccount.ts', () => {
	describe('getAccount', () => {
		it('returns the first value of web3.eth.getAccounts', async () => {
			const expected = '0x'

			const web3Stub = {
				eth: {
					getAccounts: jest.fn(async () => Promise.resolve(['0x'])),
				},
			}
			const result = await getAccount(web3Stub as unknown as Web3)

			expect(result).toEqual(expected)
			expect(web3Stub.eth.getAccounts.mock.calls.length).toEqual(1)
		})
		it('returns the value from in cache when already computed Web3 instance', async () => {
			const expected = '0x'

			const web3Stub = {
				eth: {
					getAccounts: jest.fn(async () => Promise.resolve(['0x'])),
				},
			}
			await getAccount(web3Stub as unknown as Web3) // First call.
			await getAccount(web3Stub as unknown as Web3) // Second call.
			const result = await getAccount(web3Stub as unknown as Web3) // Third call.

			expect(result).toEqual(expected)
			expect(web3Stub.eth.getAccounts.mock.calls.length).toEqual(1)
		})
	})
})
