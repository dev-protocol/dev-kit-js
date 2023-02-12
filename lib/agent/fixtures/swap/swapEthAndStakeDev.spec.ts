import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { stubTransactionResposeFactory } from '../../../common/utils/for-test'
import { ethers } from 'ethers'

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

			const provider = await ethers.getDefaultProvider()
			const block = await provider.getBlock('latest')

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				block.timestamp + 300
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

			const provider = await ethers.getDefaultProvider()
			const block = await provider.getBlock('latest')

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				block.timestamp + 300
			).catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})
