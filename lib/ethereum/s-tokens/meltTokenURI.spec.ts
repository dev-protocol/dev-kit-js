import { createMeltTokenURICaller } from './meltTokenURI'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('meltTokenURI.spec.ts', () => {
	describe('createMeltTokenURICaller', () => {
		it('call success', async () => {
			const success = true
			const tokenId = 1

			const devContract = {
				meltTokenURI: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string) => stubbedSendTx()),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMeltTokenURICaller(devContract as any)

			const result = await caller(tokenId)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const tokenId = 1
			const error = 'error'

			const devContract = {
				meltTokenURI: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createMeltTokenURICaller(devContract as any)

			const result = await caller(tokenId).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
