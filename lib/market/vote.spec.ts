import { createVoteCaller } from './vote'
import { stubbedWeb3 } from '../utils/for-test'

describe('vote.ts', () => {
	describe('createVoteCaller', () => {
		it('call success', async () => {
			const tokenNumber = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (tokenNumber: string) => ({
						send: jest.fn().mockImplementation(async () => Promise.resolve()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, stubbedWeb3)

			const result = await caller(tokenNumber)

			expect(result).toEqual(undefined)
		})

		it('call failure', async () => {
			const error = 'error'

			const tokenNumber = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (tokenNumber: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, stubbedWeb3)

			const result = await caller(tokenNumber).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
