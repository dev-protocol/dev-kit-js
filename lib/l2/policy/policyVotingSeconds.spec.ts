import { createPolicyVotingSecondsCaller } from './policyVotingSeconds'

describe('policyVotingSeconds.spec.ts', () => {
	describe('createPolicyVotingSecondsCaller', () => {
		it('call success', async () => {
			const value = '1111'

			const contract = {
				policyVotingSeconds: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyVotingSecondsCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				policyVotingSeconds: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyVotingSecondsCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
