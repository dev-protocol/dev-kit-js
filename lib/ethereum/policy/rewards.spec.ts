import { createRewardsCaller } from './rewards'

describe('rewards.spec.ts', () => {
	describe('createRewardsCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const policyContract = {
				rewards: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (lockups: string, assets: string) => value),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRewardsCaller(policyContract as any)

			const result = await caller('111111111111', '2222222222')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policyContract = {
				rewards: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (lockups: string, assets: string) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRewardsCaller(policyContract as any)

			const result = await caller('111111111111', '2222222222').catch(
				(err) => err
			)

			expect(result).toEqual(error)
		})
	})
})
