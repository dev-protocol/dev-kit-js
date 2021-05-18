import { createTotalAuthenticatedPropertiesCaller } from './totalAuthenticatedProperties'

describe('totalAuthenticatedProperties.spec.ts', () => {
	describe('createTotalAuthenticatedPropertiesCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const metricsGroupContract = {
				methods: {
					totalAuthenticatedProperties: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalAuthenticatedPropertiesCaller(
				metricsGroupContract as any
			)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const metricsGroupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					totalAuthenticatedProperties: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalAuthenticatedPropertiesCaller(
				metricsGroupContract as any
			)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
