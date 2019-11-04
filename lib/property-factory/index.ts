import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { propertyFactoryAbi } from './abi'
import { CustomOptions } from '../option'
import { createCreatePropertyCaller } from './createProperty'

export interface CreatePropertyFactoryContract {
	createProperty: (name: string, symbol: string) => Promise<string>
}

export const createPropertyFactoryContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreatePropertyFactoryContract => {
	const contractClient: Contract = new client.eth.Contract(
		propertyFactoryAbi,
		address,
		{
			...options
		}
	)

	return {
		createProperty: createCreatePropertyCaller(contractClient)
	}
}
