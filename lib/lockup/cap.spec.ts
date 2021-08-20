import { createCapCaller } from './cap'

describe('cap.spec.ts', () => {
	describe('createCapCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				cap: jest.fn().mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCapCaller(lockupContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				cap: () =>
					jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCapCaller(lockupContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
