// eslint-disable @typescript-eslint/no-explicit-any
import { createAuthenticateCaller } from './authenticate'
import { stubbedWeb3 } from '../utils/for-test'

describe('authenticate.ts', () => {
	describe('createAuthenticateCaller', () => {
		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const callbackMock = jest.fn((opts: object, cb) =>
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
				cb(null, { address: value })
			)

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					authenticate: (address: string, args: string[]) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(true)),
					}),
				},
				events: {
					authenticatedCallback: callbackMock,
				},
			}

			const expected = value

			const caller = createAuthenticateCaller(
				marketContract as any,
				stubbedWeb3
			)

			const result = await caller(address, args)

			expect(result).toEqual(expected)
		})

		it('method call failure', async () => {
			const error = 'error'

			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const args = ['aaa', 'bbbb', 'ccccc']

			const callbackMock = jest.fn((opts: object, cb) =>
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
				cb(null, { address: value })
			)

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					authenticate: (address: string, args: string[]) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
				events: {
					authenticatedCallback: callbackMock,
				},
			}

			const caller = createAuthenticateCaller(
				marketContract as any,
				stubbedWeb3
			)

			const result = await caller(address, args).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
