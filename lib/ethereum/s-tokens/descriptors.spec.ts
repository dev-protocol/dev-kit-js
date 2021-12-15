import { createDescriptorsCaller } from './descriptors'

describe('descriptors.spec.ts', () => {
	describe('createDescriptorsCaller', () => {
		it('call success', async () => {
			const value = {
				0: 'false',
				1: '0x12345',
				2: 'https://hogehoge',
				isFreezed_: 'false',
				amount_: '0x12345',
				price_: 'https://hogehoge',
			}

			const contract = {
				descriptors: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = {
				isFreezed: false,
				freezingUser: '0x12345',
				descriptor: 'https://hogehoge',
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDescriptorsCaller(contract as any)

			const result = await caller(1)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				descriptors: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDescriptorsCaller(contract as any)

			const result = await caller(1).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
