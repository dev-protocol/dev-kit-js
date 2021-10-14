import { createGetIdCaller } from './getId'

describe('getId.spec.ts', () => {
	describe('createGetIdCaller', () => {
		it('call success', async () => {
			const value = '0x0000.........'

			const contract = {
				getId: jest.fn().mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetIdCaller(contract as any)

			const result = await caller('metrics')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				getId: jest.fn().mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetIdCaller(contract as any)

			const result = await caller('metrics').catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
