import { createCalculateCumulativeHoldersRewardAmountCaller } from './calculateCumulativeHoldersRewardAmount'

describe('calculateCumulativeHoldersRewardAmount.spec.ts', () => {
	describe('calculateCumulativeHoldersRewardAmount', () => {
		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				methods: {
					calculateCumulativeHoldersRewardAmount: (
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						propertyAddress: string
					) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateCumulativeHoldersRewardAmountCaller(
				lockupContract as any
			)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				methods: {
					calculateCumulativeHoldersRewardAmount: (
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						propertyAddress: string
					) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateCumulativeHoldersRewardAmountCaller(
				lockupContract as any
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
