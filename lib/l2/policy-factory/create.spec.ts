import { createCreateCaller } from './create'
import { stubbedWeb3, stubbedSendTx } from '../../common/utils/for-test'

describe('deposit.spec.ts', () => {
	describe('createDepositCaller', () => {
		it('call success', async () => {
			const success = true
			const policy = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const devContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					create: (newPolicyAddress: string) => ({
						send: jest.fn().mockImplementation(stubbedSendTx),
					}),
				},
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreateCaller(devContract as any, stubbedWeb3)

			const result = await caller(policy)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const policy = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const devContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					create: (newPolicyAddress: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreateCaller(devContract as any, stubbedWeb3)

			const result = await caller(policy).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
