import { createSchemaCaller } from './schema'

describe('schema.ts', () => {
	describe('createSchemaCaller', () => {
		it('call success', async () => {
			const value = `["aaa","bbbb","cccc"]`
			const expected = ['aaa', 'bbbb', 'cccc']

			const marketContract = {
				schema: () => Promise.resolve(value),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSchemaCaller(marketContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('returns a correct array even if the value is using a single quoted string array', async () => {
			const value = `['aaa',"bbbb",'cccc']`
			const expected = ['aaa', 'bbbb', 'cccc']

			const marketContract = {
				schema: () => Promise.resolve(value),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSchemaCaller(marketContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const err = new Error('error')

			const marketContract = {
				schema: () => Promise.reject(err),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSchemaCaller(marketContract as any)

			await expect(caller()).rejects.toThrowError(err)
		})
	})
})
