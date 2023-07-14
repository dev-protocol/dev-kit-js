import { createBalanceOfCaller } from './balanceOf'

describe('balanceOf.spec.ts', () => {
	describe('createBalanceOfCaller', () => {
		it('call success', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const contract = {
				balanceOf: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (address: string) =>
						Promise.resolve(value),
					),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBalanceOfCaller(contract as any)

			const result = await caller(address)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				balanceOf: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (address: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBalanceOfCaller(contract as any)

			const result = await caller(address).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
