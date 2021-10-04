import { createGetRewardsAmountCaller } from './getRewardsAmount'

describe('getRewardsAmount.spec.ts', () => {
	describe('createGetRewardsAmountCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const withdrawContract = {
				getRewardsAmount: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (address: string) =>
						Promise.resolve(value)
					),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetRewardsAmountCaller(withdrawContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const withdrawContract = {
				getRewardsAmount: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (address: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetRewardsAmountCaller(withdrawContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
