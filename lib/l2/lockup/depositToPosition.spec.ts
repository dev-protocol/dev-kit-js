import { createDepositToPositionCaller } from './depositToPosition'
import { stubbedWeb3, stubbedSendTx } from '../../common/utils/for-test'

describe('depositToPosition.spec.ts', () => {
	describe('createDepositToPositionCaller', () => {
		it('call success', async () => {
			const expected = true
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					depositToPosition: (tokenId: string, amount: string) => ({
						send: jest.fn().mockImplementation(stubbedSendTx),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPositionCaller(
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
					depositToPosition: (tokenId: string, amount: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPositionCaller(
				lockupContract as any,
				stubbedWeb3
			)

			const result = await caller('32', '100').catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
