import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'

describe('totalLockedForProperty.spec.ts', () => {
	describe('createTotalLockedForPropertyCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const swapContract = {
				getEstimatedDevForEth: {
					staticCall: jest
						.fn()
						.mockImplementation(async () => Promise.resolve(value)),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForEthCaller(swapContract as any)

			const result = await caller('1000')

			expect(result).toEqual(expected)
		})

		it('call success for v2', async () => {
			const value = ['value']

			const swapContract = {
				getEstimatedDevForEth: {
					staticCall: jest
						.fn()
						.mockImplementation(async () => Promise.resolve(value)),
				},
			}

			const expected = value[1]

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForEthCaller(swapContract as any)

			const result = await caller('1000')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const swapContract = {
				getEstimatedDevForEth: {
					staticCall: jest
						.fn()
						.mockImplementation(async () => Promise.reject(error)),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForEthCaller(swapContract as any)

			const result = await caller('1000').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
