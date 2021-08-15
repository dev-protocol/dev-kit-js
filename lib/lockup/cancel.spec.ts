import { createCancelCaller } from './cancel'
import { stubbedSendTx } from '../utils/for-test'

describe('cancel.spec.ts', () => {
	describe('createCancelCaller', () => {
		it('call success', async () => {
			const value = true

			const lockupContract = {
				cancel: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (property: string) => stubbedSendTx()),
			}

			const expected = value

			const caller = createCancelCaller(lockupContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				cancel: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (property: string) =>
						Promise.reject(error)
					),
			}

			const caller = createCancelCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
