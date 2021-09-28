import { createPolicyCaller } from './policy'

describe('createPolicyCaller.spec.ts', () => {
	describe('createPolicyCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				methods: {
					registries: (name: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () =>
								Promise.resolve(name === 'policy' ? value : undefined)
							),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				methods: {
					registries: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPolicyCaller(addressConfigContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
