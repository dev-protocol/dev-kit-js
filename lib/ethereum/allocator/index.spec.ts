import { ethers } from 'ethers'
import { createAllocatorContract, CreateAllocatorContract } from '.'
import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'
import { allocatorAbi } from './abi'

jest.mock('./calculateMaxRewardsPerBlock')
jest.mock('ethers')

describe('allocator/index.ts', () => {
	describe('createAllocatorContract', () => {
		;(createCalculateMaxRewardsPerBlockCaller as jest.Mock).mockImplementation(
			() => 123
		)
		;(ethers.Contract as jest.Mock).mockImplementation(() => 123)
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'
			const provider = new ethers.JsonRpcProvider(host)
			const expected: (address: string) => CreateAllocatorContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...allocatorAbi],
					provider
				)
				return {
					calculateMaxRewardsPerBlock:
						createCalculateMaxRewardsPerBlockCaller(contract),
					contract: () => contract,
				}
			}

			const result = createAllocatorContract(provider)
			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
