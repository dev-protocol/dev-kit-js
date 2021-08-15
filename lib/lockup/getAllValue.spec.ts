import { createGetAllValueCaller } from './getAllValue'

describe('getAllValue.spec.ts', () => {
	describe('createGetAllValueCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				getAllValue: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			const caller = createGetAllValueCaller(lockupContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				getAllValue: jest
					.fn()
					.mockImplementation(async (property: string, account: string) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetAllValueCaller(lockupContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
