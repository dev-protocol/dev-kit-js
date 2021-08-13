import { createVoteCaller } from './vote'
import { stubTransactionResposeFactory } from '../utils/for-test'

describe('vote.ts', () => {
	describe('createVoteCaller', () => {
		it('call success', async () => {
			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const marketContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				vote: (propertyAddress: string, agree: boolean) =>
					jest.fn().mockResolvedValue(stubTransactionResposeFactory({})),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any)

			const result = await caller(propertyAddress, true)

			expect(result).toEqual(stubTransactionResposeFactory({}))
		})

		it('call failure', async () => {
			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const err = new Error('error')

			const marketContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				vote: (propertyAddress: string, agree: boolean) =>
					jest.fn().mockRejectedValue(err),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any)

			// const result = await caller(propertyAddress, true).catch((err) => err)

			expect(await caller(propertyAddress, true)).toThrowError(err)
		})
	})
})
