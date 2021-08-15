import { createPolicyVotingBlocksCaller } from './policyVotingBlocks'

describe('policyVotingBlocks.spec.ts', () => {
	describe('createPolicyVotingBlocksCaller', () => {
		it('call success', async () => {
			const value = '1111'

			const contract = {
				methods: {
					policyVotingBlocks: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyVotingBlocksCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				methods: {
					policyVotingBlocks: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyVotingBlocksCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
