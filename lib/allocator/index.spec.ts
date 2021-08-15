import { ethers } from 'ethers'
import { createAllocatorContract, CreateAllocatorContract } from '.'
import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'
import { allocatorAbi } from './abi'

describe('allocator/index.ts', () => {
	describe('createAllocatorContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = 'address'
			const provider = new ethers.providers.JsonRpcProvider(host)
			const expected: (address: string) => CreateAllocatorContract = (
				address: string
			) => {
				const allocatorContract = new ethers.Contract(
					address,
					[...allocatorAbi],
					provider
				)
				return {
					calculateMaxRewardsPerBlock: createCalculateMaxRewardsPerBlockCaller(
						allocatorContract
					),
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
