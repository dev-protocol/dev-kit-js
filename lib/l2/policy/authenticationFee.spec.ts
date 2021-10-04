import { createAuthenticationFeeCaller } from './authenticationFee'

describe('authenticationFee.spec.ts', () => {
	describe('createAuthenticationFeeCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const policyContract = {
				authenticationFee: jest.fn().mockImplementation(
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					async (assets: string, propertyAssets: string) => value
				),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthenticationFeeCaller(policyContract as any)

			const result = await caller('111111111111', '2222222222')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const policyContract = {
				authenticationFee: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (assets: string, propertyAssets: string) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthenticationFeeCaller(policyContract as any)

			const result = await caller('111111111111', '2222222222').catch(
				(err) => err
			)

			expect(result).toEqual(error)
		})
	})
})
