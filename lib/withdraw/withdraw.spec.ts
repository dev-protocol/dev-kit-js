import { createWithdrawCaller } from './withdraw'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('withdraw.spec.ts', () => {
	describe('createwithdrawCaller', () => {
		it('call success', async () => {
			const value = true

			const withdrawContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (property: string) => ({
						send: jest.fn().mockImplementation(() => stubbedSendTx()),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(withdrawContract as any, stubbedWeb3)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const withdrawContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(() => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(withdrawContract as any, stubbedWeb3)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
