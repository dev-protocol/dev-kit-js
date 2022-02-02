import { createCreateCaller } from './create'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('create.spec.ts', () => {
	describe('createCreateCaller', () => {
		it('call success', async () => {
			const expected = stubTransactionResposeFactory({})
			const marketFactoryContract = {
				create: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (marketBehaviorAddress: string) => expected
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreateCaller(marketFactoryContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const marketFactoryContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				create: jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createCreateCaller(marketFactoryContract as any)
			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)
			expect(result).toEqual(error)
		})
	})
})
