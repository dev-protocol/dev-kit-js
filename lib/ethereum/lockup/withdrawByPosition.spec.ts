import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('withdrawByPosition.spec.ts', () => {
	describe('createWithdrawByPositionCaller', () => {
		it('call success', async () => {
			const expected = true
			const lockupContract = {
				withdrawByPosition: jest.fn().mockImplementation(stubbedSendTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawByPositionCaller(lockupContract as any)

			const result = await caller('32', '100')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				withdrawByPosition: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawByPositionCaller(lockupContract as any)

			const result = await caller('32', '100').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
