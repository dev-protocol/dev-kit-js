import { createVoteCaller } from './vote'
import { stubbedWeb3, stubbedSendTx } from '../../common/utils/for-test'
import { txPromisify } from '../../common/utils/txPromisify'

describe('vote.ts', () => {
	describe('createVoteCaller', () => {
		it('call success', async () => {
			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (propertyAddress: string, agree: boolean) => ({
						/* eslint-disable */
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
						/* eslint-enable */
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, stubbedWeb3)

			const result = await caller(propertyAddress, true)

			expect(result).toEqual(await txPromisify(stubbedSendTx()))
		})

		it('call failure', async () => {
			const propertyAddress = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (propertyAddress: string, agree: boolean) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, stubbedWeb3)

			const result = await caller(propertyAddress, true).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
