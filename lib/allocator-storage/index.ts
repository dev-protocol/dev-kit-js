import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { allocatorStorageAbi } from './abi'
import { CustomOptions } from '../option'
import { createGetLastAssetValueEachMarketPerBlockCaller } from './getLastAssetValueEachMarketPerBlock'
import { createGetLastAssetValueEachMetricsCaller } from './getLastAssetValueEachMetrics'

export type AllocatorStorageContract = {
	readonly getLastAssetValueEachMarketPerBlock: (
		marketAddress: string
	) => Promise<string>
	readonly getLastAssetValueEachMetrics: (
		metricsAddress: string
	) => Promise<string>
}

export type CreateAllocatorStorageContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => AllocatorStorageContract

export const createAllocatorStorageContract: CreateAllocatorStorageContract = (
	client: Web3
) => (address?: string, options?: CustomOptions): AllocatorStorageContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...allocatorStorageAbi],
		address,
		{
			...options,
		}
	)

	return {
		getLastAssetValueEachMarketPerBlock: createGetLastAssetValueEachMarketPerBlockCaller(
			contractClient
		),
		getLastAssetValueEachMetrics: createGetLastAssetValueEachMetricsCaller(
			contractClient
		),
	}
}
