import { createCreatePropertyCaller } from './createProperty'
import { stubbedWeb3 } from '../utils/for-test'

describe('createProperty.spec.ts', () => {
	describe('createCreatePropertyCaller', () => {
		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const name = 'hoge'
			const symbol = 'symbol'

			const propertyFactoryContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					createProperty: (name: string, symbol: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreatePropertyCaller(
				propertyFactoryContract as any,
				stubbedWeb3
			)

			const result = await caller(name, symbol)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const name = 'hoge'
			const symbol = 'symbol'

			const propertyFactoryContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					createProperty: (name: string, symbol: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			const expected = error

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreatePropertyCaller(
				propertyFactoryContract as any,
				stubbedWeb3
			)

			const result = await caller(name, symbol).catch((err) => err)

			expect(result).toEqual(expected)
		})
	})
})
