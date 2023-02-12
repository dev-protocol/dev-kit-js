import { BigNumber } from '@ethersproject/bignumber'
import { createMetricsCountCaller } from './metricsCount'

describe('metricsCount.spec.ts', () => {
	describe('createMetricsCountCaller', () => {
		it('call success', async () => {
			const value = BigNumber.from('123456')

			const metricsFactoryContract = {
				metricsCount: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMetricsCountCaller(metricsFactoryContract as any)

			const result = await caller()

			expect(result).toEqual(123456)
		})

		it('call failure', async () => {
			const error = 'error'

			const metricsGroupContract = {
				metricsCount: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMetricsCountCaller(metricsGroupContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
