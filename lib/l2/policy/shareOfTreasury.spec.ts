import { createShareOfTreasuryCaller } from './shareOfTreasury'

describe('shareOfTreasury.spec.ts', () => {
	describe('createShareOfTreasuryCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const policyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					shareOfTreasury: (supply: string) => ({
						call: jest.fn().mockImplementation(async () => value),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createShareOfTreasuryCaller(policyContract as any)

			const result = await caller('111111111111')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					shareOfTreasury: (supply: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createShareOfTreasuryCaller(policyContract as any)

			const result = await caller('111111111111').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
