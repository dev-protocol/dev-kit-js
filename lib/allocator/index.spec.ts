import Web3 from 'web3'
import { CustomOptions } from '../option'
import { createAllocatorContract, CreateAllocatorContract } from '.'
import { createAllocateCaller } from './allocate'
import { createWithdrawCaller } from './withdraw'
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
					allocatorAbi,
					address,
					{
						...options
					}
				)
				return {
					allocate: createAllocateCaller(allocatorContract),
					withdraw: createWithdrawCaller(allocatorContract, client)
				}
			}

			const result = createAllocatorContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
