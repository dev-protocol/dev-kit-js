import { createWithdrawCaller } from './withdraw'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'
import { txPromisify } from '../utils/txPromisify'

describe('withdraw.ts', () => {
	describe('createWithdrawCaller', () => {
		it('call success', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (address: string) => ({
						send: jest.fn().mockImplementation(() => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(allocatorContract as any, stubbedWeb3)

			const result = await caller(address)

			expect(result).toEqual(await txPromisify(stubbedSendTx()))
		})

		it('call failure', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (address: string) => ({
						send: jest
							.fn()
							.mockImplementation(() => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(allocatorContract as any, stubbedWeb3)

			const result = await caller(address).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
