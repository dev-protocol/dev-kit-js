import { createTotalIssuedMetrics } from './totalIssuedMetrics'

describe('totalIssuedMetrics.spec.ts', () => {
	describe('createTotalIssuedMetrics', () => {
		it('call success', async () => {
			const value = 'value'

			const metricsGroupContract = {
				totalIssuedMetrics: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalIssuedMetrics(metricsGroupContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const metricsGroupContract = {
				totalIssuedMetrics: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTotalIssuedMetrics(metricsGroupContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
