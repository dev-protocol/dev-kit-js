import { createChangeSymbolCaller } from './changeSymbol'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('changeSymbol.spec.ts', () => {
	describe('createChangeSymbolCaller', () => {
		it('call success', async () => {
			const expected = true
			const nextSymbol = 'next'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					changeSymbol: (nextSymbol: string) => ({
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeSymbolCaller(contract as any, stubbedWeb3)

			const result = await caller(nextSymbol)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const nextSymbol = 'next'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					changeSymbol: (nextSymbol: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeSymbolCaller(contract as any, stubbedWeb3)

			const result = await caller(nextSymbol).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
