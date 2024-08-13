import { transferHistoryLengthOfRecipientCaller } from './transferHistoryLengthOfRecipient'

describe('transferHistoryLengthOfRecipient.spec.ts', () => {
	describe('transferHistoryLengthOfRecipientCaller', () => {
		it('call success', async () => {
			const value = '123'

			const rewardContract = {
				transferHistoryLengthOfRecipient: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = transferHistoryLengthOfRecipientCaller(
				rewardContract as any,
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0xC7b8B28E498233113b270B1E1e0f91049a31467a',
			)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const rewardContract = {
				transferHistoryLengthOfRecipient: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = transferHistoryLengthOfRecipientCaller(
				rewardContract as any,
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0xC7b8B28E498233113b270B1E1e0f91049a31467a',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
