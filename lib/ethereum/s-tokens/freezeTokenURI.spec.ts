import { createFreezeTokenURICaller } from './freezeTokenURI'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('freezeTokenURI.spec.ts', () => {
	describe('createFreezeTokenURICaller', () => {
		it('call success', async () => {
			const success = stubTransactionResposeFactory({})
			const tokenId = 1

			const devContract = {
				freezeTokenURI: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string) => success),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createFreezeTokenURICaller(devContract as any)

			const result = await caller(tokenId)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const tokenId = 1
			const error = 'error'

			const devContract = {
				freezeTokenURI: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createFreezeTokenURICaller(devContract as any)

			const result = await caller(tokenId).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
