import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { stubTransactionResposeFactory } from '../../../common/utils/for-test'

describe('depositToProperty.spec.ts', () => {
	describe('createDepositToPropertyCaller', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})

			const swapContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				swapEthAndStakeDev: (propertyAddress: string) =>
					Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapEthAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			)

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const swapContract = {
				swapEthAndStakeDev: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapEthAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
