import { createOwnerOfCaller } from './ownerOf'

describe('ownerOf.spec.ts', () => {
	describe('createOwnerOfCaller', () => {
		it('call success', async () => {
			const value = {
				address: '0x00',
			}

			const contract = {
				ownerOf: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = {
				address: '0x00',
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createOwnerOfCaller(contract as any)

			const result = await caller(1)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				ownerOf: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createOwnerOfCaller(contract as any)

			const result = await caller(1).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
