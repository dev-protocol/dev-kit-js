import { ethers } from 'ethers'
import { createSwapContract, SwapContract } from '.'
import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'
import { swapAbi } from './abi'
import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'

jest.mock('./getEstimatedDevForEth')
jest.mock('./swapEthAndStakeDev')

describe('swap/index.ts', () => {
	;(createGetEstimatedDevForEthCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createSwapEthAndStakeDevCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)

	describe('createSwapContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => SwapContract = (
				address: string
			) => {
				const contract = new ethers.Contract(address, [...swapAbi], provider)
				return {
					getEstimatedDevForEth: createGetEstimatedDevForEthCaller(contract),
					swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
					contract: () => contract,
				}
			}

			const result = createSwapContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
