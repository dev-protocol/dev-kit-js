import { createVoteCaller } from './vote'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'
import { txPromisify } from '../utils/txPromisify'

describe('vote.ts', () => {
	describe('createVoteCaller', () => {
		it('call success', async () => {
			const tokenNumber = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (tokenNumber: string) => ({
						send: jest.fn().mockImplementation(() => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, stubbedWeb3)

			const result = await caller(tokenNumber)

			expect(result).toEqual(await txPromisify(stubbedSendTx()))
		})

		it('call failure', async () => {
			const tokenNumber = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (tokenNumber: string) => ({
						send: jest
							.fn()
							.mockImplementation(() => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, stubbedWeb3)

			const result = await caller(tokenNumber).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
