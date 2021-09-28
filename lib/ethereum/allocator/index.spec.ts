import Web3 from 'web3'
import { CustomOptions } from '../../common/option'
import { createAllocatorContract, CreateAllocatorContract } from '.'
import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'
import { allocatorAbi } from './abi'

describe('allocator/index.ts', () => {
	describe('createAllocatorContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => CreateAllocatorContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const allocatorContract = new client.eth.Contract(
					[...allocatorAbi],
					address,
					{
						...options,
					}
				)
				return {
					calculateMaxRewardsPerBlock:
						createCalculateMaxRewardsPerBlockCaller(allocatorContract),
					contract: () => allocatorContract,
				}
			}

			const result = createAllocatorContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(
				JSON.stringify(result('0x0000000000000000000000000000000000000000'))
			).toEqual(
				JSON.stringify(expected('0x0000000000000000000000000000000000000000'))
			)
		})
	})
})
