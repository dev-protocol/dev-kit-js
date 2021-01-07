/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { allocatorAbi } from './abi'
import { CustomOptions } from '../option'
import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'
import { always } from 'ramda'

export type CreateAllocatorContract = {
	readonly calculateMaxRewardsPerBlock: () => Promise<string>
	readonly contract: () => Contract
}

export const createAllocatorContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateAllocatorContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...allocatorAbi],
		address,
		{
			...options,
		}
	)

	return {
		calculateMaxRewardsPerBlock: createCalculateMaxRewardsPerBlockCaller(
			contractClient
		),
		contract: always(contractClient),
	}
}
