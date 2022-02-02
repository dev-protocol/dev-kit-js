import { createGetMetricsCaller } from './getMetrics'

describe('getMetrics.spec.ts', () => {
	describe('createGetMetricsCaller', () => {
		it('call success', async () => {
			const value = '0x12345..........'

			const contract = {
				getMetrics: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetMetricsCaller(contract as any)

			const result = await caller('hogehoge/hugahuga')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				getMetrics: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetMetricsCaller(contract as any)

			const result = await caller('hogehoge/hugahuga').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
