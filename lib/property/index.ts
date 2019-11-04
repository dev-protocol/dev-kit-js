import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createOwnerCaller } from './owner'

export interface CreatePropertyContract {
	owner: () => Promise<string>
}

export const createPropertyContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreatePropertyContract => {
	const contractClient: Contract = new client.eth.Contract(
		propertyAbi,
		address,
		{
			...options
		}
	)

	return {
		owner: createOwnerCaller(contractClient)
	}
}
