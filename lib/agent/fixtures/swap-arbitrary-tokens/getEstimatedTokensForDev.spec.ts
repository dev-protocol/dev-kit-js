import { createGetEstimatedTokensForDevCaller } from './getEstimatedTokensForDev'

describe('getEstimatedTokensForDev.spec.ts', () => {
	describe('createGetEstimatedTokensForDevCaller.spec.ts', () => {
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
			const caller = createGetEstimatedTokensForDevCaller(contract as any)

			const result = await caller(['0x0', 10000n, '0x1', 500n], 'devAmount')

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
			const caller = createGetEstimatedTokensForDevCaller(contract as any)

			const result = await caller(
				['0x0', 10000n, '0x1', 500n],
				'devAmount',
			).catch((err) => err)

			expect(contract.callStatic.getEstimatedUsdcForDev).toBeCalledWith(
				'devAmount',
			)
			expect(result).toEqual(error)
		})
	})
})
