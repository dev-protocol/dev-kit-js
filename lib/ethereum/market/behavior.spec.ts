import { createBehaviorCaller } from './behavior'

describe('behavior.spec.ts', () => {
	describe('createBehaviorCaller', () => {
		it('call success', async () => {
			const value = '0x0000.........'

			const contract = {
				behavior: () => Promise.resolve(value),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBehaviorCaller(contract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const err = new Error('error')

			const contract = {
				behavior: () => Promise.reject(err),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createBehaviorCaller(contract as any)

			await expect(caller()).rejects.toThrowError(err)
		})
	})
})
