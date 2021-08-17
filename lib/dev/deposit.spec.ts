import { createDepositCaller } from './deposit'
import { stubbedSendTx } from '../utils/for-test'

describe('deposit.spec.ts', () => {
	describe('createDepositCaller', () => {
		it('call success', async () => {
			const success = true
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const devContract = {
				deposit: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (to: string, value: number) =>
						stubbedSendTx()
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositCaller(devContract as any)

			const result = await caller(to, value)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const devContract = {
				deposit: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (to: string, value: number) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositCaller(devContract as any)

			const result = await caller(to, value).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
