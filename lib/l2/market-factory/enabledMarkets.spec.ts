import { createEnabledMarketsCaller } from './enabledMarkets'

describe('enabledMarkets.spec.ts', () => {
	describe('createEnabledMarketsCaller', () => {
		it('call success', async () => {
			const value = ['0x0', '0x1', '0x2']

			const marketFactoryContract = {
				enabledMarkets: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createEnabledMarketsCaller(marketFactoryContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const marketFactoryContract = {
				enabledMarkets: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createEnabledMarketsCaller(marketFactoryContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
