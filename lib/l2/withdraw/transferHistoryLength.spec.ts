import { transferHistoryLengthCaller } from './transferHistoryLength'

describe('transferHistoryLength.spec.ts', () => {
	describe('transferHistoryLengthCaller', () => {
		it('call success', async () => {
			const value = '123'

			const rewardContract = {
				transferHistoryLength: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = transferHistoryLengthCaller(rewardContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const rewardContract = {
				transferHistoryLength: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = transferHistoryLengthCaller(rewardContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
