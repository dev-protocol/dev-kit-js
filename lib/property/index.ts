import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createAuthorCaller } from './author'
import { createTransferCaller } from './transfer'
import { always } from 'ramda'
import { createNameCaller } from './name'
import { createSymbolCaller } from './symbol'

export type PropertyContract = {
	readonly author: () => Promise<string>
	readonly transfer: (to: string, value: string) => Promise<boolean>
	readonly contract: () => Contract
	readonly name: () => Promise<string>
	readonly symbol: () => Promise<string>
}

export type CreatePropertyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PropertyContract

export const createPropertyContract: CreatePropertyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions): PropertyContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...propertyAbi],
		address,
		{
			...options,
		}
	)

	return {
		author: createAuthorCaller(contractClient),
		transfer: createTransferCaller(contractClient, client),
		name: createNameCaller(contractClient),
		symbol: createSymbolCaller(contractClient),
		contract: always(contractClient),
	}
}
