import { createLockupCaller } from './lockup'

describe('createLockupCaller.spec.ts', () => {
	describe('createLockupCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				lockup: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createLockupCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				lockup: jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createLockupCaller(addressConfigContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
