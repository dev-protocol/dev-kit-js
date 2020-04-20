import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import Web3 from 'web3'

export type CreateAllocateCaller = (
	contract: Contract,
	client: Web3
) => (address: string) => Promise<void>

export const createAllocateCaller: CreateAllocateCaller = (
	contract: Contract,
	client: Web3
) => async (address: string) =>
	execute({
		contract,
		method: 'allocate',
		mutation: true,
		client,
		args: [address],
	})
