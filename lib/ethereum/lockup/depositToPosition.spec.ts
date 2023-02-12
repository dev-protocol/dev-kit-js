import { createDepositToPositionCaller } from './depositToPosition'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('depositToPosition.spec.ts', () => {
	describe('createDepositToPositionCaller', () => {
		it('call success', async () => {
			const expected = stubTransactionResposeFactory({})
			const lockupContract = {
				depositToPosition: jest
					.fn()
					.mockImplementation(() => Promise.resolve(expected)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPositionCaller(lockupContract as any)

			const result = await caller('32', '100')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				depositToPosition: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPositionCaller(lockupContract as any)

			const result = await caller('32', '100').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
