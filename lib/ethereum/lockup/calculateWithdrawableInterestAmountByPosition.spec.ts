import { createcalculateWithdrawableInterestAmountByPositionCaller } from './calculateWithdrawableInterestAmountByPosition'

describe('calculateWithdrawableInterestAmountByPosition.spec.ts', () => {
	describe('createcalculateWithdrawableInterestAmountByPositionCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				calculateWithdrawableInterestAmountByPosition: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createcalculateWithdrawableInterestAmountByPositionCaller(
				lockupContract as any,
			)

			const result = await caller('123')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				calculateWithdrawableInterestAmountByPosition: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createcalculateWithdrawableInterestAmountByPositionCaller(
				lockupContract as any,
			)

			const result = await caller('123').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
