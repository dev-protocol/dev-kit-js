import Web3 from 'web3'
import { marketAbi } from './abi'
import { createAuthenticateCaller } from './authenticate'
import { CustomOptions } from '../option'

describe('authenticate.ts', () => {
	describe('createAuthenticateCaller', () => {
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
				address: string,
				args: string[]
			) => Promise<string> = async (address: string, args: string[]) => {
				await marketContract.methods
					.authenticate([address, ...args])
					.call()
					.then(result => result as boolean)

				return new Promise<string>((resolve, reject) =>
					marketContract.events
						.authenticatedCallback({}, (_, event) => {
							resolve(event.address)
						})
						.on('error', error => reject(error))
				)
			}

			const result = createAuthenticateCaller(marketContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const callbackMock = jest.fn((opts: object, cb) =>
				cb(null, { address: value })
			)

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					authenticate: (address: string, args: string[]) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(true))
					})
				},
				events: {
					authenticatedCallback: callbackMock
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthenticateCaller(marketContract as any)

			const result = await caller(address, args)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const callbackMock = jest.fn((opts: object, cb) => cb(null, { address }))

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					authenticate: (address: string, args: string[]) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				},
				events: {
					authenticatedCallback: callbackMock
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthenticateCaller(marketContract as any)

			const result = await caller(address, args).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
