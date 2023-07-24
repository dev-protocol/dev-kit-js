import { ethers, JsonRpcProvider } from 'ethers'
import {
	createSwapArbitraryTokensContract,
	SwapArbitraryTokensContract,
} from '.'
import { createGetEstimatedDevForTokensCaller } from './getEstimatedDevForTokens'
import { createGetEstimatedTokensForDevCaller } from './getEstimatedTokensForDev'
import { createSwapTokensAndStakeDevCaller } from './swapTokensAndStakeDev'
import { swapArbitraryTokensAbi } from './abi'

jest.mock('./getEstimatedDevForTokens')
jest.mock('./getEstimatedTokensForDev')
jest.mock('./swapTokensAndStakeDev')

describe('swap-arbitrary-tokens/index.ts', () => {
	;(createGetEstimatedDevForTokensCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(createGetEstimatedTokensForDevCaller as jest.Mock).mockImplementation(
		() => 123,
	)
	;(createSwapTokensAndStakeDevCaller as jest.Mock).mockImplementation(
		() => 123,
	)

	describe('createSwapArbitraryTokensContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new JsonRpcProvider(host)

			const expected: (address: string) => SwapArbitraryTokensContract = (
				address: string,
			) => {
				const contract = new ethers.Contract(
					address,
					[...swapArbitraryTokensAbi],
					provider,
				)
				return {
					getEstimatedDevForTokens:
						createGetEstimatedDevForTokensCaller(contract),
					getEstimatedTokensForDev:
						createGetEstimatedTokensForDevCaller(contract),
					swapTokensAndStakeDev: createSwapTokensAndStakeDevCaller(contract),
					contract: () => contract,
				}
			}

			const result = createSwapArbitraryTokensContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address)),
			)
		})
	})
})
