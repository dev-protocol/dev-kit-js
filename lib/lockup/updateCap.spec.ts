import { createUpdateCapCaller } from './updateCap'
import { stubbedWeb3, stubbedSendTx } from '../utils/for-test'
import { txPromisify } from '../utils/txPromisify'

describe('updateCap.spec.ts', () => {
	describe('createUpdateCapCaller', () => {
		it('call success', async () => {
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					updateCap: (geometricMean: string) => ({
						send: jest.fn().mockImplementation(async () => stubbedSendTx()),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createUpdateCapCaller(lockupContract as any, stubbedWeb3)

			const result = await caller('100')

			expect(result).toEqual(await txPromisify(stubbedSendTx()))
		})

		it('call failure', async () => {
			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					updateCap: (geometricMean: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => stubbedSendTx(undefined, true)),
					}),
				},
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createUpdateCapCaller(lockupContract as any, stubbedWeb3)

			const result = await caller('100').catch((err) => err)

			expect(result).toBeInstanceOf(Error)
		})
	})
})
