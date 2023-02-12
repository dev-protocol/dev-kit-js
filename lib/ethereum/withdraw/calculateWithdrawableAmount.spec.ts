import { createCalculateWithdrawableAmountCaller } from './calculateWithdrawableAmount'

describe('calculateWithdrawableAmount.spec.ts', () => {
	describe('createCalculateWithdrawableAmountCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const withdrawContract = {
				calculateWithdrawableAmount: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (address: string) =>
						Promise.resolve(value)
					),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateWithdrawableAmountCaller(
				withdrawContract as any
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0xC7b8B28E498233113b270B1E1e0f91049a31467a'
			)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const withdrawContract = {
				calculateWithdrawableAmount: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (address: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateWithdrawableAmountCaller(
				withdrawContract as any
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0xC7b8B28E498233113b270B1E1e0f91049a31467a'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
