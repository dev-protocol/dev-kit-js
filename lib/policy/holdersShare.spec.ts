import { createHoldersShareCaller } from './holdersShare'

describe('holdersShare.spec.ts', () => {
	describe('createHoldersShareCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const policyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					holdersShare: (amount: string, lockups: string) => ({
						call: jest.fn().mockImplementation(async () => value),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createHoldersShareCaller(policyContract as any)

			const result = await caller('111111111111', '2222222222')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					holdersShare: (amount: string, lockups: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createHoldersShareCaller(policyContract as any)

			const result = await caller('111111111111', '2222222222').catch(
				(err) => err
			)

			expect(result).toEqual(error)
		})
	})
})
