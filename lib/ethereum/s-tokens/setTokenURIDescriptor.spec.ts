import { createSetTokenURIDescriptorCaller } from './setTokenURIDescriptor'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('setTokenURIDescriptor.spec.ts', () => {
	describe('createSetTokenURIDescriptorCaller', () => {
		it('call success', async () => {
			const success = stubTransactionResposeFactory({})
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const descriptorAddress = '0x88EF51355B34f7Bb4874a731916841702cAeF2C7'

			const devContract = {
				setTokenURIDescriptor: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (propertyAddress: string, descriptorAddress: string) => success),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIDescriptorCaller(devContract as any)

			const result = await caller(propertyAddress, descriptorAddress)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const descriptorAddress = '0x88EF51355B34f7Bb4874a731916841702cAeF2C7'
			const error = 'error'

			const devContract = {
				setTokenURIDescriptor: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (propertyAddress: string, descriptorAddress: string) =>
						Promise.reject(error)
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIDescriptorCaller(devContract as any)

			const result = await caller(propertyAddress, descriptorAddress).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})