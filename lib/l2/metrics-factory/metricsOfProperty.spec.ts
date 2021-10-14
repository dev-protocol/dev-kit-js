import { createMetricsOfPropertyCaller } from './metricsOfProperty'

describe('metricsOfProperty.spec.ts', () => {
	describe('createMetricsOfPropertyCaller', () => {
		it('call success', async () => {
			const value = ['0x0', '0x1', '0x2']

			const metricsFactoryContract = {
				metricsOfProperty: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMetricsOfPropertyCaller(
				metricsFactoryContract as any
			)

			const result = await caller('property')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const metricsGroupContract = {
				metricsOfProperty: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMetricsOfPropertyCaller(metricsGroupContract as any)

			const result = await caller('property').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
