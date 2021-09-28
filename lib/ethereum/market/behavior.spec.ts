import { createBehaviorCaller } from './behavior'

describe('behavior.spec.ts', () => {
	describe('createBehaviorCaller', () => {
		it('call success', async () => {
			const value = '0x0000.........'

			const contract = {
				methods: {
					behavior: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBehaviorCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				methods: {
					behavior: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBehaviorCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
