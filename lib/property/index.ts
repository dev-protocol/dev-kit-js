import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createOwnerCaller } from './owner'
import { createTransferCaller } from './transfer'

export interface PropertyContract {
	owner: () => Promise<string>
	transfer: (to: string, value: number) => Promise<boolean>
}

export type CreatePropertyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PropertyContract

export const createPropertyContract: CreatePropertyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions): PropertyContract => {
	const contractClient: Contract = new client.eth.Contract(
		propertyAbi,
		address,
		{
			...options
		}
	)

	return {
		owner: createOwnerCaller(contractClient),
		transfer: createTransferCaller(contractClient)
	}
}
