import { createChangeSymbolCaller } from './changeSymbol'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('changeSymbol.spec.ts', () => {
	describe('createChangeSymbolCaller', () => {
		it('call success', async () => {
			const expected = true
			const nextSymbol = 'next'

			const contract = {
				changeSymbol: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (nextSymbol: string) => stubbedSendTx()),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeSymbolCaller(contract as any)

			const result = await caller(nextSymbol)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const nextSymbol = 'next'

			const contract = {
				changeSymbol: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (nextSymbol: string) =>
						stubbedSendTx(undefined, true)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeSymbolCaller(contract as any)

			const result = await caller(nextSymbol).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
