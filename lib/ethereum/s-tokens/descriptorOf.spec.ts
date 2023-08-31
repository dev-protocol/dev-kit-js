import { ZeroAddress } from 'ethers'
import { createDescriptorOfCaller } from './descriptorOf'

describe('descriptorOf.spec.ts', () => {
	describe('createDescriptorOfCaller', () => {
		it('call success', async () => {
			const value = '0x74657374696e67'
			const propertyAddress = ZeroAddress

			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				descriptorOf: jest.fn().mockImplementation(async () => value),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDescriptorOfCaller(devContract as any)

			const result = await caller(propertyAddress)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const propertyAddress = ZeroAddress
			const error = 'error'

			const devContract = {
				descriptorOf: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDescriptorOfCaller(devContract as any)

			const result = await caller(propertyAddress).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
