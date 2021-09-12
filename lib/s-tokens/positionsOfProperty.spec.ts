import { createPositionsOfPropertyCaller } from './positionsOfProperty'

describe('positionsOfProperty.spec.ts', () => {
	describe('createPositionsOfPropertyCaller', () => {
		it('call success', async () => {
			const value = ['1', '2', '3', '4', '5', '6']

			const contract = {
				methods: {
					positionsOfProperty: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPositionsOfPropertyCaller(contract as any)

			const result = await caller('0xAddress')

			expect(result).toEqual([1, 2, 3, 4, 5, 6])
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				methods: {
					positionsOfProperty: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPositionsOfPropertyCaller(contract as any)

			const result = await caller('0xAddress').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
