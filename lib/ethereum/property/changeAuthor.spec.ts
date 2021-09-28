import { createChangeAuthorCaller } from './changeAuthor'
import { stubbedWeb3, stubbedSendTx } from '../../common/utils/for-test'

describe('changeAuthor.spec.ts', () => {
	describe('createChangeAuthorCaller', () => {
		it('call success', async () => {
			const expected = true
			const nextAuther = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					changeAuthor: (nextAuther: string) => ({
						send: jest.fn().mockImplementation(stubbedSendTx),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeAuthorCaller(contract as any, stubbedWeb3)

			const result = await caller(nextAuther)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const nextAuther = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					changeAuthor: (nextAuther: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeAuthorCaller(contract as any, stubbedWeb3)

			const result = await caller(nextAuther).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
