import { createPropertyCaller } from './property'

describe('property.spec.ts', () => {
	describe('createPropertyCaller', () => {
		it('call success', async () => {
			const value = '0x0000.........'

			const contract = {
				property: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPropertyCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				property: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPropertyCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
