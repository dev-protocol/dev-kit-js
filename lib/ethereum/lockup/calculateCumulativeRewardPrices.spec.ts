import { createCalculateCumulativeRewardPricesCaller } from './calculateCumulativeRewardPrices'

describe('calculateCumulativeRewardPrices.spec.ts', () => {
	describe('createCalculateCumulativeRewardPricesCaller', () => {
		it('call success', async () => {
			const value = ['value1', 'value2', 'value3', 'value4']

			const lockupContract = {
				calculateCumulativeRewardPrices: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateCumulativeRewardPricesCaller(
				lockupContract as any,
			)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				calculateCumulativeRewardPrices: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateCumulativeRewardPricesCaller(
				lockupContract as any,
			)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
