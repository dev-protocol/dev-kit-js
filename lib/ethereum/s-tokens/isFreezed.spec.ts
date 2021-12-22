import { createIsFreezedCaller } from './isFreezed'

describe('isFreezed.spec.ts', () => {
	describe('createIsFreezedCaller', () => {
		it('call success', async () => {
			const value = true
			const tokenId = 1

			const devContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				isFreezed: jest
					.fn()
					.mockImplementation(async (tokenId: string) => value),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createIsFreezedCaller(devContract as any)

			const result = await caller(tokenId)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const tokenId = 1
			const error = 'error'

			const devContract = {
				isFreezed: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (tokenId: string) => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createIsFreezedCaller(devContract as any)

			const result = await caller(tokenId).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
