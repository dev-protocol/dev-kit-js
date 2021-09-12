import { createTokenURICaller } from './tokenURI'

describe('tokenURI.spec.ts', () => {
	describe('createTokenURICaller', () => {
		it('call success', async () => {
			const data = {
				name: 'test-name',
				description: 'test-description',
				image: 'test-image',
			}
			const value = JSON.stringify(data)

			const contract = {
				methods: {
					tokenURI: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = data

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTokenURICaller(contract as any)

			const result = await caller(1)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				methods: {
					tokenURI: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTokenURICaller(contract as any)

			const result = await caller(1).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
