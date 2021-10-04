import { createChangeAuthorCaller } from './changeAuthor'
import { stubbedSendTx } from '../../common/utils/for-test'

describe('changeAuthor.spec.ts', () => {
	describe('createChangeAuthorCaller', () => {
		it('call success', async () => {
			const expected = true
			const nextAuther = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				changeAuthor: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async (nextAuther: string) => stubbedSendTx()),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeAuthorCaller(contract as any)

			const result = await caller(nextAuther)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const nextAuther = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const error = 'error'

			const contract = {
				changeAuthor: jest
					.fn()
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeAuthorCaller(contract as any)

			const result = await caller(nextAuther).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
