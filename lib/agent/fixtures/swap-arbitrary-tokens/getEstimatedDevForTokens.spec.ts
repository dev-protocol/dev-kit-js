import { createGetEstimatedDevForTokensCaller } from './getEstimatedDevForTokens'

describe('getEstimatedDevForUsdc.spec.ts', () => {
	describe('createGetEstimatedDevForUsdcCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const swapUsdcContract = {
				callStatic: {
					getEstimatedDevForUsdc: jest
						.fn()
						.mockImplementation(async () => Promise.resolve(value)),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForTokensCaller(
				swapUsdcContract as any,
			)

			const result = await caller('1000')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const swapUsdcContract = {
				callStatic: {
					getEstimatedDevForUsdc: jest
						.fn()
						.mockImplementation(async () => Promise.reject(error)),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForTokensCaller(
				swapUsdcContract as any,
			)

			const result = await caller('1000').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
