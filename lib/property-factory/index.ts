import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { propertyFactoryAbi } from './abi'
import { CustomOptions } from '../option'
import { createCreatePropertyCaller } from './create'
import { WaitForEventOptions } from '../market/authenticate'
import { createCreateAndAuthenticateCaller } from './createAndAuthenticate'
import { always } from 'ramda'

export type PropertyFactoryContract = {
	readonly create: (
		name: string,
		symbol: string,
		author: string
	) => Promise<string>
	readonly createAndAuthenticate: (
		name: string,
		symbol: string,
		marketAddress: string,
		args: readonly string[],
		options: WaitForEventOptions
	) => Promise<string>
	readonly contract: () => Contract
}

export type CreatePropertyFactoryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PropertyFactoryContract

export const createPropertyFactoryContract: CreatePropertyFactoryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => {
	const contractClient: Contract = new client.eth.Contract(
		[...propertyFactoryAbi],
		address,
		{
			...options,
		}
	)

	return {
		create: createCreatePropertyCaller(contractClient, client),
		createAndAuthenticate: createCreateAndAuthenticateCaller(
			contractClient,
			client
		),
		contract: always(contractClient),
	}
}
