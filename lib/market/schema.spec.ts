import { createSchemaCaller } from './schema'

describe('schema.ts', () => {
	describe('createSchemaCaller', () => {
		it('call success', async () => {
			const value = `["aaa","bbbb","cccc"]`

			const marketContract = {
				methods: {
					schema: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = JSON.parse(value)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSchemaCaller(marketContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const marketContract = {
				methods: {
					schema: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSchemaCaller(marketContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
