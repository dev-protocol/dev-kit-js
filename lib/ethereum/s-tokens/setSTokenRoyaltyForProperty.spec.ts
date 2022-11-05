import { createSetSTokenRoyaltyForPropertyCaller } from './setSTokenRoyaltyForProperty'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('setSTokenRoyaltyForProperty.spec.ts', () => {
	describe('createSetSTokenRoyaltyForPropertyCaller', () => {
		it('call success', async () => {
			const success = stubTransactionResposeFactory({})
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const royalty = 10

			const devContract = {
				setSTokenRoyaltyForProperty: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (propertyAddress: string, royalty: number) => success),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetSTokenRoyaltyForPropertyCaller(devContract as any)

			const result = await caller(propertyAddress, royalty)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const royalty = 10
			const error = 'error'

			const devContract = {
				setSTokenRoyaltyForProperty: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (propertyAddress: string, descriptorAddress: string) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetSTokenRoyaltyForPropertyCaller(devContract as any)

			const result = await caller(propertyAddress, royalty).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
