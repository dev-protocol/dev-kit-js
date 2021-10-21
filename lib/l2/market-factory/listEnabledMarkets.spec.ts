import { createListEnabledMarketsCaller } from './listEnabledMarkets'

describe('listEnabledMarkets.spec.ts', () => {
	describe('createListEnabledMarketsCaller', () => {
		it('call success', async () => {
			const value = ['0x0', '0x1', '0x2']

			const marketFactoryContract = {
				listEnabledMarkets: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createListEnabledMarketsCaller(
				marketFactoryContract as any
			)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const marketFactoryContract = {
				listEnabledMarkets: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
				enableMarketList: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createListEnabledMarketsCaller(
				marketFactoryContract as any
			)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
