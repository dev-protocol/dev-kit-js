import { ContractRunner, ethers } from 'ethers'
import { allocatorAbi } from './abi'
import { createCalculateMaxRewardsPerBlockCaller } from './calculateMaxRewardsPerBlock'
import { always } from 'ramda'

export type CreateAllocatorContract = {
	readonly calculateMaxRewardsPerBlock: () => Promise<string>
	readonly contract: () => ethers.Contract
}

export const createAllocatorContract =
	(provider: ContractRunner) =>
	(address: string): CreateAllocatorContract => {
		const contract = new ethers.Contract(address, [...allocatorAbi], provider)
		return {
			calculateMaxRewardsPerBlock:
				createCalculateMaxRewardsPerBlockCaller(contract),
			contract: always(contract),
		}
	}
