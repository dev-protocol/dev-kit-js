import { createChangeNameCaller } from './changeName'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('changeName.spec.ts', () => {
	describe('createChangeNameCaller', () => {
		it('call success', async () => {
			const expected = true
			const nextName = 'next'

			const contract = {
				changeName: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (nextName: string) => stubbedSendTx()),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeNameCaller(contract as any)

			const result = await caller(nextName)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const nextName = 'next'
			const error = 'error'

			const contract = {
				changeName: jest
					.fn()

					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeNameCaller(contract as any)

			const result = await caller(nextName).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
