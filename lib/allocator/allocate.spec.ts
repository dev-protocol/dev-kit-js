import { createAllocateCaller } from './allocate'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'
import { txPromisify } from '../utils/txPromisify'

describe('allocate.ts', () => {
	describe('createAllocateCaller', () => {
		it('call success', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					allocate: (address: string) => ({
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAllocateCaller(allocatorContract as any, stubbedWeb3)

			const result = await caller(address)

			expect(result).toEqual(await txPromisify(stubbedSendTx()))
		})

		it('call failure', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					allocate: (address: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createAllocateCaller(allocatorContract as any, stubbedWeb3)

			const result = await caller(address).catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
