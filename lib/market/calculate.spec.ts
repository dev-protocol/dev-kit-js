import Web3 from 'web3'
import { marketAbi } from './abi'
import { createCalculateCaller } from './calculate'
import { CustomOptions } from '../option'

describe('calculate.ts', () => {
	describe('createCalculateCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions
			const marketContract = new client.eth.Contract(marketAbi, address, {
				...options
			})

			const expected: (
				metrics: string,
				start: string,
				end: string
			) => Promise<boolean> = async (
				metrics: string,
				start: string,
				end: string
			) =>
				marketContract.methods
					.calculate([metrics, start, end])
					.call()
					.then(result => JSON.parse(result) as boolean)

			const result = createCalculateCaller(marketContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = true

			const metrics = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const start = '415015037515107510571371750157109'
			const end = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					calculate: (metrics: string, start: string, end: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateCaller(marketContract as any)

			const result = await caller(metrics, start, end)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const metrics = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const start = '415015037515107510571371750157109'
			const end = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					calculate: (metrics: string, start: string, end: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateCaller(marketContract as any)

			const result = await caller(metrics, start, end).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
