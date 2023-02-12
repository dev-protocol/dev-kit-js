import { createTotalLockedCaller } from './totalLocked'

describe('totalLocked.spec.ts', () => {
	describe('createTotalLockedCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				totalLocked: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalLockedCaller(lockupContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				totalLocked: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalLockedCaller(lockupContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
