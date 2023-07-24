import { ZeroAddress, solidityPacked } from 'ethers'
import { createGetEstimatedTokensForDevCaller } from './getEstimatedTokensForDev'

describe('getEstimatedTokensForDev.spec.ts', () => {
	describe('createGetEstimatedTokensForDevCaller.spec.ts', () => {
		it('call success', async () => {
			const value = 'value'

			const contract = {
				getEstimatedTokensForDev: {
					staticCall: jest
						.fn()
						.mockImplementation(async () => Promise.resolve(value)),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedTokensForDevCaller(contract as any)

			const result = await caller(
				[ZeroAddress, 10000n, ZeroAddress, 500n],
				'devAmount',
			)

			expect(contract.getEstimatedTokensForDev.staticCall).toBeCalledWith(
				solidityPacked(
					['address', 'uint24', 'address', 'uint24'],
					[ZeroAddress, 10000n, ZeroAddress, 500n],
				),
				'devAmount',
			)
			expect(result).toEqual(value)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				getEstimatedTokensForDev: {
					staticCall: jest
						.fn()
						.mockImplementation(async () => Promise.reject(error)),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEstimatedTokensForDevCaller(contract as any)

			const result = await caller(
				[ZeroAddress, 10000n, ZeroAddress, 500n],
				'devAmount',
			).catch((err) => err)

			expect(contract.getEstimatedTokensForDev.staticCall).toBeCalledWith(
				solidityPacked(
					['address', 'uint24', 'address', 'uint24'],
					[ZeroAddress, 10000n, ZeroAddress, 500n],
				),
				'devAmount',
			)
			expect(result).toEqual(error)
		})
	})
})
