import { devKitClient } from './client'
import Web3 from 'web3'

describe('devKitClient', () => {
	it('check instance type', () => {
		const host = 'localhost'
		const client = devKitClient(host)
		const result = client instanceof Web3
		expect(result).toBe(true)
	})
})
