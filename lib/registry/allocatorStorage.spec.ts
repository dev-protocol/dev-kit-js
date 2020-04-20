import { createAllocatorStorageCaller } from './allocatorStorage'
describe('createAllocatorStorageCaller.spec.ts', () => {
	describe('createAllocatorStorageCaller', () => {
		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				methods: {
					allocatorStorage: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value)),
					}),
				},
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAllocatorStorageCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				methods: {
					allocatorStorage: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAllocatorStorageCaller(addressConfigContract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
