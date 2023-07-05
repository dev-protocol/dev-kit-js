import { createRemoveImageCaller } from './removeImage'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('removeImage.spec.ts', () => {
	describe('createRemoveImage', () => {
		it('call success', async () => {
			const propertyAddress = '0x0000000000000000000000000000000000000000'
			const keys = ['0x000']

			const success = stubTransactionResposeFactory({})
			const devContract = {
				removeImage: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (
							propertyAddress: string,
							keys: readonly string[]
						) => success
					),
			}
			const expected = success
			const caller = createRemoveImageCaller(devContract as any)
			const result = await caller(propertyAddress, keys)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = '0x0000000000000000000000000000000000000000'
			const keys = ['0x000']

			const error = 'error'
			const devContract = {
				removeImage: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (
							propertyAddress: string,
							keys: readonly string[]
						) => Promise.reject(error)
					),
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createRemoveImageCaller(devContract as any)
			const result = await caller(propertyAddress, keys).catch(
				(err) => err
			)

			expect(result).toEqual(error)
		})
	})
})
