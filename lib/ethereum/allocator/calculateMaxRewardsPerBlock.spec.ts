import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'

describe('calculateMaxRewardsPerBlock.spec.ts', () => {
	describe('createCalculateMaxRewardsPerBlockCaller', () => {
		it('call failure', async () => {
			const error = 'error'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					calculateMaxRewardsPerBlock: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCalculateMaxRewardsPerBlockCaller(
				allocatorContract as any
			)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
