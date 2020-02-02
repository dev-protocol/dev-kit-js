import Web3 from 'web3'
import { devAbi } from './abi'
import { createBalanceOfCaller } from './balanceOf'
import { CustomOptions } from '../option'

describe('balanceOf.spec.ts', () => {
	describe('createBalanceOfCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions

			const devContract = new client.eth.Contract(devAbi, address, {
				...options
			})

			const expected: (address: string) => Promise<string> = async (
				address: string
			) =>
				devContract.methods
					.balanceOf(address)
					.call()
					.then((result: string) => result)

			const result = createBalanceOfCaller(devContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const devContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					balanceOf: (address: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBalanceOfCaller(devContract as any)

			const result = await caller(address)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const devContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					balanceOf: (address: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBalanceOfCaller(devContract as any)

			const result = await caller(address).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
