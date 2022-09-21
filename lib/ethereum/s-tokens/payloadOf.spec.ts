import { createpayloadOfCaller } from './payloadOf'

describe('payloadOf.spec.ts', () => {
	describe('createpayloadOfCaller', () => {
		it('call success', async () => {
			const value = "0x74657374696e67"
			const tokenId = 1

			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				payloadOf: jest
					.fn()
					.mockImplementation(async (tokenId: string) => value),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createpayloadOfCaller(devContract as any)

			const result = await caller(tokenId)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const tokenId = 1
			const error = 'error'

			const devContract = {
				payloadOf: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createpayloadOfCaller(devContract as any)

			const result = await caller(tokenId).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
