import { createTokenURICaller } from './tokenURI'

describe('tokenURI.spec.ts', () => {
	describe('createTokenURICaller', () => {
		it('call success', async () => {
			const data = {
				name: 'NAME',
				description: 'DESCRIPTION',
				image: 'data:image/svg+xml;base64,<svg></svg>',
			}
			const value = `data:application/json;base64,eyJuYW1lIjoiTkFNRSIsICJkZXNjcmlwdGlvbiI6IkRFU0NSSVBUSU9OIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsPHN2Zz48L3N2Zz4ifQ==`

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
