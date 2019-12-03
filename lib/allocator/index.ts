import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { allocatorAbi } from './abi'
import { CustomOptions } from '../option'
import { createAllocateCaller } from './allocate'
import { createWithdrawCaller } from './withdraw'

export interface CreateAllocatorContract {
	allocate: (address: string) => Promise<void>
	withdraw: (address: string) => Promise<void>
}

export const createAllocatorContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateAllocatorContract => {
	const contractClient: Contract = new client.eth.Contract(
		allocatorAbi,
		address,
		{
			...options
		}
	)

	return {
		allocate: createAllocateCaller(contractClient),
		withdraw: createWithdrawCaller(contractClient)
	}
}
