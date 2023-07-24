import { createGetLockedupPropertiesCaller } from './getLockedupProperties'

describe('getLockedupProperties.spec.ts', () => {
	describe('createGetLockedupPropertiesCaller', () => {
		it('call success', async () => {
			const value = [
				{ property: '0x0', value: 1n },
				{ property: '0x1', value: 2n },
				{ property: '0x2', value: 3n },
			]

			const lockupContract = {
				getLockedupProperties: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = [
				{ property: '0x0', value: '1' },
				{ property: '0x1', value: '2' },
				{ property: '0x2', value: '3' },
			]

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetLockedupPropertiesCaller(lockupContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				getLockedupProperties: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetLockedupPropertiesCaller(lockupContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
