import { createRoyaltyOfCaller } from './royaltyOf'

describe('royaltyOf.spec.ts', () => {
	describe('createRoyaltyOfCaller', () => {
		it('call success', async () => {
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const royalty = 10

			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				royaltyOf: jest
					.fn()
					.mockImplementation(async (propertyAddress: string) => royalty),
			}

			const expected = royalty

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRoyaltyOfCaller(devContract as any)

			const result = await caller(propertyAddress)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const error = 'error'

			const devContract = {
				royaltyOf: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (propertyAddress: string) =>
						Promise.reject(error),
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRoyaltyOfCaller(devContract as any)

			const result = await caller(propertyAddress).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
