import Web3 from 'web3'
import { createAllocatorStorageContract, AllocatorStorageContract } from '.'
import { allocatorStorageAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetLastAssetValueEachMarketPerBlockCaller } from './getLastAssetValueEachMarketPerBlock'
import { createGetLastAssetValueEachMetricsCaller } from './getLastAssetValueEachMetrics'

describe('allocator-storage/index.ts', () => {
	describe('createAllocatorStorageContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			const expected: (
				address?: string,
				options?: CustomOptions
			) => AllocatorStorageContract = (
				address?: string,
				options?: CustomOptions
			) => {
				const allocatorStorageContract = new client.eth.Contract(
					[...allocatorStorageAbi],
					address,
					{
						...options,
					}
				)
				return {
					getLastAssetValueEachMarketPerBlock: createGetLastAssetValueEachMarketPerBlockCaller(
						allocatorStorageContract
					),
					getLastAssetValueEachMetrics: createGetLastAssetValueEachMetricsCaller(
						allocatorStorageContract
					),
				}
			}

			const result = createAllocatorStorageContract(client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result())).toEqual(JSON.stringify(expected()))
		})
	})
})
