import { createMarketVotingSecondsCaller } from './marketVotingSeconds'

describe('marketVotingSeconds.spec.ts', () => {
	describe('createMarketVotingSecondsCaller', () => {
		it('call success', async () => {
			const value = '1111'

			const contract = {
				marketVotingSeconds: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMarketVotingSecondsCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				marketVotingSeconds: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMarketVotingSecondsCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
