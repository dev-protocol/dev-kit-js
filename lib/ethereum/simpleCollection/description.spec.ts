import { Rewards } from '../s-tokens/rewards'
import { createQueryCaller } from './queryCaller'
import { Positions as StakingPosition } from '../s-tokens'

describe('description.spec.ts', () => {
	describe('createQueryCaller:description', () => {
		it('call success', async () => {
			const value = "This is image description"

			const id = 1
			const address = ''
			const stakingPositions = {
				property: '0x0000000000000000000000000000000000000000',
				amount: '0',
				price: '0',
				cumulativeReward: '0',
				pendingReward: '0'
			}
			const rewards = {
				entireReward: '0',
				cumulativeReward: '0',
				withdrawableReward: '0'
			}
			const keys = ['0x000']
			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				description: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (id: number, address: string, stakingPositions: StakingPosition, rewards: Rewards, keys: readonly string[]) => value),
			}
			const expected = value
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createQueryCaller(devContract as any, 'description')
			const result = await caller(id, address, stakingPositions, rewards, keys)
			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const id = 1
			const address = ''
			const stakingPositions = {
				property: '0x0000000000000000000000000000000000000000',
				amount: '0',
				price: '0',
				cumulativeReward: '0',
				pendingReward: '0'
			}
			const rewards = {
				entireReward: '0',
				cumulativeReward: '0',
				withdrawableReward: '0'
			}
			const keys = ['0x000']
			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				description: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (id: number, address: string, stakingPositions: StakingPosition, rewards: Rewards, keys: readonly string[]) => Promise.reject(error)),
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createQueryCaller(devContract as any, 'description')
			const result = await caller(id, address, stakingPositions, rewards, keys).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
