import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { allocatorAbi } from './abi'
import { CustomOptions } from '../option'
import { createAllocateCaller } from './allocate'
import { createWithdrawCaller } from './withdraw'
import { TxReceipt } from '../utils/web3-txs'

export interface CreateAllocatorContract {
	allocate: (address: string) => Promise<TxReceipt>
	withdraw: (address: string) => Promise<TxReceipt>
}

export const createAllocatorContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateAllocatorContract => {
	const contractClient: Contract = new client.eth.Contract(
		allocatorAbi,
		address,
		{
			...options,
		}
	)

	return {
		allocate: createAllocateCaller(contractClient, client),
		withdraw: createWithdrawCaller(contractClient, client),
	}
}
