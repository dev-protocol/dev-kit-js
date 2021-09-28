import { createPolicyGroupCaller } from './policyGroup'

describe('createPolicyGroupCaller.spec.ts', () => {
	describe('createPolicyGroupCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				methods: {
					policyGroup: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyGroupCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				methods: {
					policyGroup: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyGroupCaller(addressConfigContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
