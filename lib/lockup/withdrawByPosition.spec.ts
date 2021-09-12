import { createWithdrawByPositionCaller } from './withdrawByPosition'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('withdrawByPosition.spec.ts', () => {
	describe('createWithdrawByPositionCaller', () => {
		it('call success', async () => {
			const expected = true
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdrawByPosition: (tokenId: string, amount: string) => ({
						send: jest.fn().mockImplementation(stubbedSendTx),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawByPositionCaller(
				lockupContract as any,
				stubbedWeb3
			)

			const result = await caller('32', '100')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdrawByPosition: (tokenId: string, amount: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawByPositionCaller(
				lockupContract as any,
				stubbedWeb3
			)

			const result = await caller('32', '100').catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
