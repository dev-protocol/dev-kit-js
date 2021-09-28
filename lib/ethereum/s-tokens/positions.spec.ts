import { createPositionsCaller } from './positions'

describe('positions.spec.ts', () => {
	describe('createPositionsCaller', () => {
		it('call success', async () => {
			const value = {
				0: '0x00',
				1: '10000000000',
				3: '20000000000',
				4: '30000000000',
				5: '40000000000',
				property_: '0x00',
				amount_: '10000000000',
				price_: '20000000000',
				cumulativeReward_: '30000000000',
				pendingReward_: '40000000000',
			}

			const contract = {
				methods: {
					positions: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = {
				property: '0x00',
				amount: '10000000000',
				price: '20000000000',
				cumulativeReward: '30000000000',
				pendingReward: '40000000000',
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPositionsCaller(contract as any)

			const result = await caller(1)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				methods: {
					positions: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createPositionsCaller(contract as any)

			const result = await caller(1).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
