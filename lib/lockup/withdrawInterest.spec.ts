import { createWithdrawInterestCaller } from './withdrawInterest'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('withdrawInterest.spec.ts', () => {
	describe('createWithdrawInterestCaller', () => {
		it('call success', async () => {
			const value = true

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdrawInterest: (property: string) => ({
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawInterestCaller(
				lockupContract as any,
				stubbedWeb3
			)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdrawInterest: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawInterestCaller(
				lockupContract as any,
				stubbedWeb3
			)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
