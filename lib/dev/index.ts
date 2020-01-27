import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { devAbi } from './abi'
import { CustomOptions } from '../option'
import { createTransferCaller } from './transfer'
import { createDepositCaller } from './deposit'

export interface DevContract {
	transfer: (to: string, value: number) => Promise<boolean>
	deposit: (to: string, value: number) => Promise<boolean>
}

export type CreateDevContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => DevContract

export const createDevContract: CreateDevContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): DevContract => {
	const contractClient: Contract = new client.eth.Contract(devAbi, address, {
		...options
	})

	return {
		transfer: createTransferCaller(contractClient),
		deposit: createDepositCaller(contractClient)
	}
}
