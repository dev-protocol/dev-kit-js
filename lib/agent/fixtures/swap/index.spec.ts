import { ethers } from 'ethers'
import { createSwapContract, SwapContract } from '.'
import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'
import { createGetEstimatedEthForDevCaller } from './getEstimatedEthForDev'
import { swapAbiV3 } from './abi-v3'
import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { createSwapEthAndStakeDevPolygonCaller } from './swapEthAndStakeDevPolygon'

jest.mock('./getEstimatedDevForEth')
jest.mock('./getEstimatedEthForDev')
jest.mock('./swapEthAndStakeDev')

describe('swap/index.ts', () => {
	;(createGetEstimatedDevForEthCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createGetEstimatedEthForDevCaller as jest.Mock).mockImplementation(
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

			const expected: (address: string) => SwapContract = (address: string) => {
				const contract = new ethers.Contract(address, [...swapAbiV3], provider)
				return {
					getEstimatedDevForEth: createGetEstimatedDevForEthCaller(
						contract,
					),
					getEstimatedEthForDev: createGetEstimatedEthForDevCaller(contract),
					swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
					swapEthAndStakeDevPolygonCaller:
						createSwapEthAndStakeDevPolygonCaller(contract),
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
