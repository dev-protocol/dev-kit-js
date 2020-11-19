import { createChangeAuthorCaller } from './changeAuthor'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'

describe('changeAuthor.spec.ts', () => {
	describe('createChangeAuthorCaller', () => {
		it('call success', async () => {
			const expected = true
			const nextOwther = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					changeAuthor: (nextOwther: string) => ({
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeAuthorCaller(contract as any, stubbedWeb3)

			const result = await caller(nextOwther)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const nextOwther = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const contract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					changeAuthor: (nextOwther: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createChangeAuthorCaller(contract as any, stubbedWeb3)

			const result = await caller(nextOwther).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
