import { createIsGroupCaller } from './isGroup'

describe('isGroup.spec.ts', () => {
	describe('createIsGroupCaller', () => {
		it('call success', async () => {
			const value = true

			const policyGroupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					isGroup: (policy: string) => ({
						call: jest.fn().mockImplementation(async () => value),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createIsGroupCaller(policyGroupContract as any)

			const result = await caller('0x0')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policyGroupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					isGroup: (policy: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createIsGroupCaller(policyGroupContract as any)

			const result = await caller('0x0').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
