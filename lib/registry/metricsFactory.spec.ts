import { createMetricsFactoryCaller } from './metricsFactory'

describe('createMetricsFactoryCaller.spec.ts', () => {
	describe('createMetricsFactoryCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				metricsFactory: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMetricsFactoryCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				metricsFactory: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMetricsFactoryCaller(addressConfigContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
