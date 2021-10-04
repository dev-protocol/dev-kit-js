import { createBulkWithdrawCaller } from './bulkWithdraw'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('bulkWithdraw.spec.ts', () => {
	describe('createBulkWithdrawCaller', () => {
		it('call success', async () => {
			const address = '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			const stubTx = stubTransactionResposeFactory({})
			const withdrawContract = {
				bulkWithdraw: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (properties: readonly string[]) =>
						Promise.resolve(stubTx)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBulkWithdrawCaller(withdrawContract as any)

			const result = await caller([address])

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const propertyAddress = '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			const err = new Error('error')
			const withdrawContract = {
				bulkWithdraw: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (properties: readonly string[]) =>
						Promise.reject(err)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBulkWithdrawCaller(withdrawContract as any)
			await expect(caller([propertyAddress])).rejects.toThrowError(err)
		})
	})
})
