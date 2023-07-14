import { createRegistriesCaller } from './registries'

describe('registries.spec.ts', () => {
	describe('createRegistriesCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const contract = {
				registries: jest
					.fn()
					.mockImplementation(async (key: string) =>
						Promise.resolve(key === 'test' ? value : undefined),
					),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRegistriesCaller(contract as any)

			const result = await caller('test')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				registries: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRegistriesCaller(contract as any)

			const result = await caller('test').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
