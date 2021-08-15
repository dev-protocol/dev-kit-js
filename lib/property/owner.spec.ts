import { createOwnerCaller } from './owner'

describe('owner.spec.ts', () => {
	describe('createOwnerCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const propertyContract = {
				owner: jest.fn().mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createOwnerCaller(propertyContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const propertyContract = {
				owner: jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createOwnerCaller(propertyContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
