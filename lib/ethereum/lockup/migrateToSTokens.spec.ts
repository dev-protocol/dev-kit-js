import { createMigrateToSTokensCaller } from './migrateToSTokens'
import {  stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('migrateToSTokens.spec.ts', () => {
	describe('createMigrateToSTokensCaller', () => {
		it('call success', async () => {
			const expected = stubTransactionResposeFactory({})
			const lockupContract = {
				migrateToSTokens: jest.fn().mockImplementation(()=>Promise.resolve(expected)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMigrateToSTokensCaller(lockupContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				migrateToSTokens: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMigrateToSTokensCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
