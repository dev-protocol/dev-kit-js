import { createGetEstimatedEthForDevCaller } from './getEstimatedEthForDev'

describe('totalLockedForProperty.spec.ts', () => {
	describe('createTotalLockedForPropertyCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const swapContract = {
				callStatic: {
					getEstimatedEthForDev: jest
						.fn()
						.mockImplementation(async () => Promise.resolve(value)),
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedEthForDevCaller(swapContract as any)

			const result = await caller('1000')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const swapContract = {
				callStatic: {
					getEstimatedEthForDev: jest
						.fn()
						.mockImplementation(async () => Promise.reject(error)),
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedEthForDevCaller(swapContract as any)

			const result = await caller(
				'1000'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
