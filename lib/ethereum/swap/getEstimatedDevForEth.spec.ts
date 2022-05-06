import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'

describe('totalLockedForProperty.spec.ts', () => {
	describe('createTotalLockedForPropertyCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				getEstimatedDevForEth: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForEthCaller(lockupContract as any)

			const result = await caller('1000')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				getEstimatedDevForEth: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedDevForEthCaller(lockupContract as any)

			const result = await caller(
				'1000'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
