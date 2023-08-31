import { ZeroAddress, keccak256, toUtf8Bytes, toUtf8String } from 'ethers'
import { createDescriptorOfPropertyByPayloadCaller } from './descriptorOfPropertyByPayload'

describe('descriptorOfPropertyByPayload.spec.ts', () => {
	describe('createDescriptorOfPropertyByPayloadCaller', () => {
		it('call success', async () => {
			const value = '0x74657374696e67'
			const propertyAddress = ZeroAddress
			const payload = toUtf8Bytes('x')

			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				descriptorOfPropertyByPayload: jest
					.fn()
					.mockImplementation(async () => value),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDescriptorOfPropertyByPayloadCaller(
				devContract as any,
			)

			const result = await caller(propertyAddress, payload)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = ZeroAddress
			const payload = toUtf8Bytes('x')
			const error = 'error'

			const devContract = {
				descriptorOfPropertyByPayload: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDescriptorOfPropertyByPayloadCaller(
				devContract as any,
			)

			const result = await caller(propertyAddress, payload).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
