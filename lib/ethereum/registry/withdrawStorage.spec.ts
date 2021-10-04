import { createWithdrawStorageCaller } from './withdrawStorage'

describe('createWithdrawStorageCaller.spec.ts', () => {
	describe('createWithdrawStorageCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				withdrawStorage: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawStorageCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				withdrawStorage: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawStorageCaller(addressConfigContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
