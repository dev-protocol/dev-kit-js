import { Image } from './types'
import { createSetImagesCaller } from './setImages'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('setImages.spec.ts', () => {
	describe('createSetImages', () => {
		it('call success', async () => {
			const propertyAddress = '0x0000000000000000000000000000000000000000'
			const images = [
				{
					src: 'https://example.com',
					requiredETHAmount: 0,
					requiredETHFee: 0,
					gateway: '0x0000000000000000000000000000000000000000',
				},
			]
			const keys = ['0x000']

			const success = stubTransactionResposeFactory({})
			const devContract = {
				setImages: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (
							propertyAddress: string,
							images: readonly Image[],
							keys: readonly string[],
						) => success,
					),
			}
			const expected = success
			const caller = createSetImagesCaller(devContract as any)
			const result = await caller(propertyAddress, images, keys)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = '0x0000000000000000000000000000000000000000'
			const images = [
				{
					src: 'https://example.com',
					requiredETHAmount: 0,
					requiredETHFee: 0,
					gateway: '0x0000000000000000000000000000000000000000',
				},
			]
			const keys = ['0x000']

			const error = 'error'
			const devContract = {
				setImages: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (
							propertyAddress: string,
							images: readonly Image[],
							keys: readonly string[],
						) => Promise.reject(error),
					),
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetImagesCaller(devContract as any)
			const result = await caller(propertyAddress, images, keys).catch(
				(err) => err,
			)

			expect(result).toEqual(error)
		})
	})
})
