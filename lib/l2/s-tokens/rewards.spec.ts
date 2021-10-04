import { createRewardsCaller } from './rewards'

describe('rewards.spec.ts', () => {
	describe('createRewardsCaller', () => {
		it('call success', async () => {
			const value = {
				0: '10000000000',
				1: '20000000000',
				2: '30000000000',
				entireReward_: '10000000000',
				cumulativeReward_: '20000000000',
				withdrawableReward_: '30000000000',
			}

			const contract = {
				rewards: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = {
				entireReward: '10000000000',
				cumulativeReward: '20000000000',
				withdrawableReward: '30000000000',
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRewardsCaller(contract as any)

			const result = await caller(1)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				rewards: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRewardsCaller(contract as any)

			const result = await caller(1).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
