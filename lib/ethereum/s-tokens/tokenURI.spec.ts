import { createTokenURICaller } from './tokenURI'

describe('tokenURI.spec.ts', () => {
	describe('createTokenURICaller', () => {
		it('call success', async () => {
			const data = {
				name: 'NAME',
				description: 'DESCRIPTION_1\n\nDESCRIPTION_2',
				image: 'data:image/svg+xml;base64,<svg></svg>',
				attributes: [
					{
						trait_type: 'Destination',
						value: '0x0',
					},
					{
						trait_type: 'Locked Amount',
						display_type: 'number',
						value: 123.456,
					},
					{
						trait_type: 'Payload',
						value: '0x1',
					},
				],
			}
			const value = `data:application/json;base64,${Buffer.from(
				JSON.stringify(data),
			).toString('base64')}`

			const contract = {
				tokenURI: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
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
				tokenURI: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTokenURICaller(contract as any)

			const result = await caller(1).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
