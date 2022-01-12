import { createSetTokenURIImageCaller } from './setTokenURIImage'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('setTokenURIImage.spec.ts', () => {
	describe('createSetTokenURIImageCaller', () => {
		it('call success', async () => {
			const success = true
			const tokenId = 1
			const data = 'https://hogehoge'

			const devContract = {
				setTokenURIImage: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string, data: string) =>
						stubbedSendTx()
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIImageCaller(devContract as any)

			const result = await caller(tokenId, data)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const tokenId = 1
			const data = 'https://hogehoge'
			const error = 'error'

			const devContract = {
				setTokenURIImage: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string, data: string) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIImageCaller(devContract as any)

			const result = await caller(tokenId, data).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
