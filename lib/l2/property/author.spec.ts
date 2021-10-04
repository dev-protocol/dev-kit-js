import { createAuthorCaller } from './author'

describe('author.spec.ts', () => {
	describe('createAuthorCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const propertyContract = {
				author: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthorCaller(propertyContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const propertyContract = {
				author: jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthorCaller(propertyContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
