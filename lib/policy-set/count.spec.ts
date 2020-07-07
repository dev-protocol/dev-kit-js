import { createCountCaller } from './count'

describe('count.spec.ts', () => {
	describe('createCountCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const policySetContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					count: () => ({
						call: jest.fn().mockImplementation(async () => value),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCountCaller(policySetContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policySetContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					count: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCountCaller(policySetContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
