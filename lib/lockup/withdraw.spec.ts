import { createWithdrawCaller } from './withdraw'
import { stubbedWeb3 } from '../utils/for-test'

describe('withdraw.spec.ts', () => {
	describe('createWithdrawCaller', () => {
		it('call success', async () => {
			const value = true

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(lockupContract as any, stubbedWeb3)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(lockupContract as any, stubbedWeb3)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
