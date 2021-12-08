import { createDepositToPropertyCaller } from './depositToProperty'
import { stubbedSendTx, stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('depositToProperty.spec.ts', () => {
	describe('createDepositToPropertyCaller', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})

			const lockupContract = {
				depositToProperty: jest.fn().mockImplementation(async (propertyAddress: string, amount: number) => Promise.resolve(stubTx)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPropertyCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'100'
			)
			
			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				depositToProperty: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPropertyCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'100'
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
