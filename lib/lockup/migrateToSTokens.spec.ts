import { createMigrateToSTokensCaller } from './migrateToSTokens'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('migrateToSTokens.spec.ts', () => {
	describe('createMigrateToSTokensCaller', () => {
		it('call success', async () => {
			const expected = true
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					migrateToSTokens: (property: string) => ({
						send: jest.fn().mockImplementation(stubbedSendTx),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMigrateToSTokensCaller(
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
					migrateToSTokens: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMigrateToSTokensCaller(
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
