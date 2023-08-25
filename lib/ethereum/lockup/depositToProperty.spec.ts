import { createDepositToPropertyCaller } from './depositToProperty'
import { stubTransactionResposeFactory } from '../../common/utils/for-test'

describe('depositToProperty.spec.ts', () => {
	describe('createDepositToPropertyCaller', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})

			const lockupContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				'depositToProperty(address,uint256)': (
					propertyAddress: string,
					amount: number,
				) => Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPropertyCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'100',
			)

			expect(result).toEqual(stubTx)
		})

		it('call success with optional payload', async () => {
			const expected = stubTransactionResposeFactory({})
			const lockupContract = {
				'depositToProperty(address,uint256,bytes32)': jest
					.fn()
					.mockImplementation(() => Promise.resolve(expected)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPropertyCaller(lockupContract as any)

			const result = await caller(
				'32',
				'100',
				'0xb690e3d57bc3c98d69dfb6136cd622b2ba93f965cc4740a53019a867a8af2106',
			)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const lockupContract = {
				'depositToProperty(address,uint256)': jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createDepositToPropertyCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'100',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
