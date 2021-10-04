import { createWithdrawCaller } from './withdraw'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('withdraw.spec.ts', () => {
	describe('createwithdrawCaller', () => {
		it('call success', async () => {
			const value = true

			const withdrawContract = {
				withdraw: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (property: string) => stubbedSendTx()),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(withdrawContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const address = '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			const err = new Error('error')
			const withdrawContract = {
				withdraw: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (property: string) => Promise.reject(err)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(withdrawContract as any)
			await expect(caller(address)).rejects.toThrowError(err)
		})
	})
})
