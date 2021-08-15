import { createTotalSupplyCaller } from './totalSupply'

describe('totalSupply.spec.ts', () => {
	describe('createTotalSupplyCaller', () => {
		it('call success', async () => {
			const value = '12345'

			const devContract = {
				totalSupply: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalSupplyCaller(devContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const devContract = {
				totalSupply: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalSupplyCaller(devContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
