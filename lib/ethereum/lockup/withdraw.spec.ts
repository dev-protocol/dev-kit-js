import { createWithdrawCaller } from './withdraw'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('withdraw.spec.ts', () => {
	describe('createWithdrawCaller', () => {
		it('call success', async () => {
			const expected = stubTransactionResposeFactory({})
			const lockupContract = {
				withdraw: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (property: string) => expected),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'100',
			)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				withdraw: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (property: string) =>
						Promise.reject(error),
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'100',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
