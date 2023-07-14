import { createAuthenticatedPropertiesCountCaller } from './authenticatedPropertiesCount'

describe('authenticatedPropertiesCount.spec.ts', () => {
	describe('createAuthenticatedPropertiesCountCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const metricsFactoryContract = {
				authenticatedPropertiesCount: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthenticatedPropertiesCountCaller(
				metricsFactoryContract as any,
			)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const metricsGroupContract = {
				authenticatedPropertiesCount: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAuthenticatedPropertiesCountCaller(
				metricsGroupContract as any,
			)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
