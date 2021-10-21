import { createGetEnabledMarketsCaller } from './getEnabledMarkets'

describe('getEnabledMarkets.spec.ts', () => {
	describe('createGetEnabledMarketsCaller', () => {
		it('call success', async () => {
			const value = ['0x0', '0x1', '0x2']

			const marketFactoryContract = {
				getEnabledMarkets: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEnabledMarketsCaller(marketFactoryContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const marketFactoryContract = {
				getEnabledMarkets: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
				enableMarketList: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetEnabledMarketsCaller(marketFactoryContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
