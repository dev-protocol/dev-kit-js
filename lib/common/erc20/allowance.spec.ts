import { createAllowanceCaller } from './allowance'

describe('allowance.spec.ts', () => {
	describe('createAllowanceCaller', () => {
		it('call success', async () => {
			const from = '0x1E9342827907CD370CB8Ba2F768d7D50b2f457F9'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const contract = {
				allowance: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (from: string, to: string) =>
						Promise.resolve(value),
					),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAllowanceCaller(contract as any)

			const result = await caller(from, to)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const from = '0x1E9342827907CD370CB8Ba2F768d7D50b2f457F9'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				allowance: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (from: string, to: string) =>
						Promise.reject(error),
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAllowanceCaller(contract as any)

			const result = await caller(from, to).catch((err) => err)
			expect(result).toEqual(error)
		})
	})
})
