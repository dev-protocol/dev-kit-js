import { createSetTokenURIDescriptorCaller } from './setTokenURIDescriptor'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'
import { keccak256, randomBytes } from 'ethers'

describe('setTokenURIDescriptor.spec.ts', () => {
	describe('createSetTokenURIDescriptorCaller', () => {
		it('call success', async () => {
			const success = stubTransactionResposeFactory({})
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const descriptorAddress = '0x88EF51355B34f7Bb4874a731916841702cAeF2C7'

			const devContract = {
				'setTokenURIDescriptor(address,address)': jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (propertyAddress: string, descriptorAddress: string) =>
							success,
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIDescriptorCaller(devContract as any)

			const result = await caller(propertyAddress, descriptorAddress)

			expect(result).toEqual(expected)
		})

		it('call success with optional payloads (Uint8Array[])', async () => {
			const success = stubTransactionResposeFactory({})
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const descriptorAddress = '0x88EF51355B34f7Bb4874a731916841702cAeF2C7'

			const devContract = {
				'setTokenURIDescriptor(address,address,bytes32[])': jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (
							propertyAddress: string,
							descriptorAddress: string,
							payloads: readonly Uint8Array[],
						) => success,
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIDescriptorCaller(devContract as any)

			const result = await caller(propertyAddress, descriptorAddress, [
				new Uint8Array([1, 2, 3]),
				new Uint8Array([4, 5, 6]),
			])

			expect(result).toEqual(expected)
		})

		it('call success with optional payloads (string[])', async () => {
			const success = stubTransactionResposeFactory({})
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const descriptorAddress = '0x88EF51355B34f7Bb4874a731916841702cAeF2C7'

			const devContract = {
				'setTokenURIDescriptor(address,address,bytes32[])': jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (
							propertyAddress: string,
							descriptorAddress: string,
							payloads: readonly string[],
						) => success,
					),
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIDescriptorCaller(devContract as any)

			const result = await caller(propertyAddress, descriptorAddress, [
				keccak256(randomBytes(3)),
				keccak256(randomBytes(3)),
			])

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = '0x541F7914ED2A4a8B477edc711FA349A77983F3AD'
			const descriptorAddress = '0x88EF51355B34f7Bb4874a731916841702cAeF2C7'
			const error = 'error'

			const devContract = {
				'setTokenURIDescriptor(address,address)': jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(
						async (propertyAddress: string, descriptorAddress: string) =>
							Promise.reject(error),
					),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSetTokenURIDescriptorCaller(devContract as any)

			const result = await caller(propertyAddress, descriptorAddress).catch(
				(err) => err,
			)

			expect(result).toEqual(error)
		})
	})
})
