import { createPositionsOfOwnerCaller } from './positionsOfOwner'

describe('positionsOfOwner.spec.ts', () => {
	describe('createPositionsOfOwnerCaller', () => {
		it('call success', async () => {
			const value = ['1', '2', '3', '4', '5', '6']

			const contract = {
				positionsOfOwner: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPositionsOfOwnerCaller(contract as any)

			const result = await caller('0xAddress')

			expect(result).toEqual([1, 2, 3, 4, 5, 6])
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				positionsOfOwner: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPositionsOfOwnerCaller(contract as any)

			const result = await caller('0xAddress').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
