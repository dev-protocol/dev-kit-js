import { createApproveCaller } from './approve'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('approve.spec.ts', () => {
	describe('createApproveCaller', () => {
		it('call success', async () => {
			const success = true
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					approve: (to: string, value: number) => ({
						send: jest.fn().mockImplementation(stubbedSendTx),
					}),
				},
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createApproveCaller(contract as any, stubbedWeb3)

			const result = await caller(to, value)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					approve: (to: string, value: number) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createApproveCaller(contract as any, stubbedWeb3)

			const result = await caller(to, value).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
