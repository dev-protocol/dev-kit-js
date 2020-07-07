import { createGetCaller } from './get'

describe('get.spec.ts', () => {
	describe('createGetCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const policySetContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					get: (index: string) => ({
						call: jest.fn().mockImplementation(async () => value),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetCaller(policySetContract as any)

			const result = await caller('1')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policySetContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					get: (index: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetCaller(policySetContract as any)

			const result = await caller('1').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
