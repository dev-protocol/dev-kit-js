import { createTransferCaller } from './transfer'
import { stubbedWeb3 } from '../utils/for-test'

describe('transfer.spec.ts', () => {
	describe('createTransferCaller', () => {
		it('call success', async () => {
			const success = true
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const propertyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					transfer: (to: string, value: number) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(success)),
					}),
				},
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTransferCaller(propertyContract as any, stubbedWeb3)

			const result = await caller(to, value)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const propertyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					transfer: (to: string, value: number) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTransferCaller(propertyContract as any, stubbedWeb3)

			const result = await caller(to, value).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
