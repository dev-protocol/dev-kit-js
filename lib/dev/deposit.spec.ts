import { createDepositCaller } from './deposit'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('deposit.spec.ts', () => {
	describe('createDepositCaller', () => {
		it('call success', async () => {
			const success = true
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const devContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					deposit: (to: string, value: number) => ({
						send: jest.fn().mockImplementation(() => stubbedSendTx()),
					}),
				},
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositCaller(devContract as any, stubbedWeb3)

			const result = await caller(to, value)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const devContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					deposit: (to: string, value: number) => ({
						send: jest
							.fn()
							.mockImplementation(() => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositCaller(devContract as any, stubbedWeb3)

			const result = await caller(to, value).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
