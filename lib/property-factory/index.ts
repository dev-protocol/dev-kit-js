import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { propertyFactoryAbi } from './abi'
import { CustomOptions } from '../option'
import { createCreatePropertyCaller } from './createProperty'

export interface PropertyFactoryContract {
	createProperty: (name: string, symbol: string) => Promise<string>
}

export type CreatePropertyFactoryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PropertyFactoryContract

export const createPropertyFactoryContract: CreatePropertyFactoryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => {
	const contractClient: Contract = new client.eth.Contract(
		propertyFactoryAbi,
		address,
		{
			...options,
		}
	)

	return {
		createProperty: createCreatePropertyCaller(contractClient, client),
	}
}
