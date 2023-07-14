import { createCalculateRewardAmountCaller } from './calculateRewardAmount'

describe('calculateRewardAmount.spec.ts', () => {
	describe('calculateRewardAmount', () => {
		it('call success', async () => {
			const value = ['value', 'value2']

			const lockupContract = {
				calculateRewardAmount: jest.fn().mockImplementation(
					async (
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						propertyAddress: string,
					) => Promise.resolve(value),
				),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateRewardAmountCaller(lockupContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				calculateRewardAmount: jest.fn().mockImplementation(
					async (
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						propertyAddress: string,
					) => Promise.reject(error),
				),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateRewardAmountCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
