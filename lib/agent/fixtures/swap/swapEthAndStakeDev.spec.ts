import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { stubTransactionResposeFactory } from '../../../common/utils/for-test'

describe('depositToProperty.spec.ts', () => {
	describe('createDepositToPropertyCaller', () => {
		it('call success', async () => {
			const stubTx = stubTransactionResposeFactory({})

			const swapContract = {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				'swapEthAndStakeDev(address,uint256,bytes32)': (
					propertyAddress: string,
				) => Promise.resolve(stubTx),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapEthAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				Math.floor(new Date().getTime() / 1000) + 300,
			)

			expect(result).toEqual(stubTx)
		})

		it('call failure', async () => {
			const error = 'error'
			const swapContract = {
				'swapEthAndStakeDev(address,uint256,bytes32)': jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createSwapEthAndStakeDevCaller(swapContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				Math.floor(new Date().getTime() / 1000) + 300,
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
