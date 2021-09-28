/* eslint-disable functional/no-class */
import { createDetectSTokens } from './createDetectSTokens'

describe('detectSTokens.ts', () => {
	describe('createDetectSTokens', () => {
		it('returns an array of IDs of the staking positions for the Property owned by the user', async () => {
			const propertyAddress = '0xPropertyAddress'
			const accountAddress = '0xAccountAddress'
			const sTokens = {
				positionsOfProperty: (a: string) =>
					Promise.resolve(
						a === propertyAddress ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : []
					),
				positionsOfOwner: (a: string) =>
					Promise.resolve(a === accountAddress ? [9, 5, 1, 2, 12] : []),
			}
			const result = await createDetectSTokens(sTokens as any)(
				propertyAddress,
				accountAddress
			)
			const expected = [1, 2, 5, 9]

			expect(result).toEqual(expected)
		})
	})
})
