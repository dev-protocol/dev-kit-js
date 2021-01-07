import { createBulkWithdrawCaller } from './bulkWithdraw'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'
import { txPromisify } from '../utils/txPromisify'

describe('bulkWithdraw.spec.ts', () => {
	describe('createBulkWithdrawCaller', () => {
		it('call success', async () => {
			const withdrawContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					bulkWithdraw: (properties: readonly string[]) => ({
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBulkWithdrawCaller(
				withdrawContract as any,
				stubbedWeb3
			)

			const result = await caller([
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			])

			expect(result).toEqual(await txPromisify(stubbedSendTx()))
		})

		it('call failure', async () => {
			const withdrawContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					bulkWithdraw: (properties: readonly string[]) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBulkWithdrawCaller(
				withdrawContract as any,
				stubbedWeb3
			)

			const result = await caller([
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			]).catch((err) => err)
			expect(result).toBeInstanceOf(Error)
		})
	})
})
