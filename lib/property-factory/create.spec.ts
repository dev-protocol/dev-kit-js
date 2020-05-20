import { createCreatePropertyCaller } from './create'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('createProperty.spec.ts', () => {
	describe('createCreatePropertyCaller', () => {
		it('call success', async () => {
			const value = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const name = 'hoge'
			const symbol = 'symbol'
			const author = '0xD3E15c84c1eb38B530EC628145B73c90308645a2'

			const propertyFactoryContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					create: (name: string, symbol: string, author: string) => ({
						send: jest
							.fn()
							.mockImplementation(() =>
								stubbedSendTx({ name: 'Create', property: '_property', value })
							),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreatePropertyCaller(
				propertyFactoryContract as any,
				stubbedWeb3
			)

			const result = await caller(name, symbol, author)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const name = 'hoge'
			const symbol = 'symbol'
			const author = '0xD3E15c84c1eb38B530EC628145B73c90308645a2'

			const propertyFactoryContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					create: (name: string, symbol: string, author: string) => ({
						send: jest
							.fn()
							.mockImplementation(() =>
								stubbedSendTx(
									{ name: 'Create', property: '_property', value: '' },
									true
								)
							),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreatePropertyCaller(
				propertyFactoryContract as any,
				stubbedWeb3
			)

			const result = await caller(name, symbol, author).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
