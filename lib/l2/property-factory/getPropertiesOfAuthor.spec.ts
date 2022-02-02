import { createGetPropertiesOfAuthorCaller } from './getPropertiesOfAuthor'

describe('getPropertiesOfAuthor.spec.ts', () => {
	describe('createGetPropertiesOfAuthorrCaller', () => {
		it('call success', async () => {
			const value = ['0x1', '0x2', '0x3', '0x4', '0x5', '0x6']

			const contract = {
				getPropertiesOfAuthor: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetPropertiesOfAuthorCaller(contract as any)

			const result = await caller('0xAddress')

			expect(result).toEqual(value)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				getPropertiesOfAuthor: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetPropertiesOfAuthorCaller(contract as any)

			const result = await caller('0xAddress').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
