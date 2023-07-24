import { createGetEstimatedUsdcForDevCaller } from './getEstimatedUsdcForDev'

describe('getEstimatedUsdcForDev.spec.ts', () => {
	describe('createGetEstimatedUsdcForDevCaller.spec.ts', () => {
		it('call success', async () => {
			const value = 'value'

			const contract = {
				callStatic: {
					getEstimatedUsdcForDev: jest
						.fn()
						.mockImplementation(async () => Promise.resolve(value)),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedUsdcForDevCaller(contract as any)

			const result = await caller('devAmount')

			expect(contract.callStatic.getEstimatedUsdcForDev).toBeCalledWith(
				'devAmount',
			)
			expect(result).toEqual(value)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				callStatic: {
					getEstimatedUsdcForDev: jest
						.fn()
						.mockImplementation(async () => Promise.reject(error)),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedUsdcForDevCaller(contract as any)

			const result = await caller('devAmount').catch((err) => err)

			expect(contract.callStatic.getEstimatedUsdcForDev).toBeCalledWith(
				'devAmount',
			)
			expect(result).toEqual(error)
		})
	})
})
