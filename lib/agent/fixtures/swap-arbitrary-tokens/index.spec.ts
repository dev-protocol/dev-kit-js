import { ethers } from 'ethers'
import { createSwapUsdcContract, SwapUsdcContract } from '.'
import { createGetEstimatedDevForUsdcCaller } from './getEstimatedDevForUsdc'
import { createGetEstimatedUsdcForDevCaller } from './getEstimatedUsdcForDev'
import { createSwapUsdcAndStakeDevCaller } from './swapUsdcAndStakeDev'
import { swapUsdcAbi } from './abi'

jest.mock('./getEstimatedDevForUsdc')
jest.mock('./getEstimatedUsdcForDev')
jest.mock('./swapUsdcAndStakeDev')

describe('swap-usdc/index.ts', () => {
	;(createGetEstimatedDevForUsdcCaller as jest.Mock).mockImplementation(
		(contract) => contract,
	)
	;(createGetEstimatedUsdcForDevCaller as jest.Mock).mockImplementation(
		(contract) => contract,
	)
	;(createSwapUsdcAndStakeDevCaller as jest.Mock).mockImplementation(
		(contract) => contract,
	)

	describe('createSwapUsdcContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => SwapUsdcContract = (
				address: string,
			) => {
				const contract = new ethers.Contract(
					address,
					[...swapUsdcAbi],
					provider,
				)
				return {
					getEstimatedDevForUsdc: createGetEstimatedDevForUsdcCaller(contract),
					getEstimatedUsdcForDev: createGetEstimatedUsdcForDevCaller(contract),
					swapUsdcAndStakeDevCaller: createSwapUsdcAndStakeDevCaller(contract),
					contract: () => contract,
				}
			}

			const result = createSwapUsdcContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address)),
			)
		})
	})
})
