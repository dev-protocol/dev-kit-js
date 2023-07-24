import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'

describe('calculateMaxRewardsPerBlock.spec.ts', () => {
	describe('createCalculateMaxRewardsPerBlockCaller', () => {
		it('call failure', async () => {
			const error = 'error'
			const allocatorContract = {
				calculateMaxRewardsPerBlock: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			const caller = createCalculateMaxRewardsPerBlockCaller(
				allocatorContract as any,
			)
			const result = await caller().catch((err) => err)
			expect(result).toEqual(error)
		})
	})
})
