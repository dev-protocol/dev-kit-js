import { BigNumber } from 'ethers'
import { createGetBalancesCaller } from './getBalances'

describe('GetBalances.spec.ts', () => {
	describe('createGetBalancesCaller', () => {
		it('call success', async () => {
			const value = [
				{ account: '0x0', balance: BigNumber.from(1) },
				{ account: '0x1', balance: BigNumber.from(2) },
				{ account: '0x2', balance: BigNumber.from(3) },
			]

			const propertyContract = {
				GetBalances: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = [
				{ account: '0x0', balance: '1' },
				{ account: '0x1', balance: '2' },
				{ account: '0x2', balance: '3' },
			]

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetBalancesCaller(propertyContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const propertyContract = {
				GetBalances: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetBalancesCaller(propertyContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
