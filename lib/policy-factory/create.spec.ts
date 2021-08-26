import { createCreateCaller } from './create'
import { stubbedSendTx } from '../utils/for-test'

describe('deposit.spec.ts', () => {
	describe('createDepositCaller', () => {
		it('call success', async () => {
			const success = true
			const policy = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const devContract = {
				create: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (newPolicyAddress: string) =>
						stubbedSendTx()
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreateCaller(devContract as any)

			const result = await caller(policy)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const policy = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const error = 'error'

			const devContract = {
				create: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreateCaller(devContract as any)

			const result = await caller(policy).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
