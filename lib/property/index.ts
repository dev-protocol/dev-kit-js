import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createAuthorCaller } from './author'
import { createTransferCaller } from './transfer'
import { always } from 'ramda'
import { createNameCaller } from './name'
import { createSymbolCaller } from './symbol'
import { createTotalSupplyCaller } from './totalSupply'
import { createDecimalsCaller } from './decimals'
import { createTransferFromCaller } from './transferFrom'
import { createBalanceOfCaller } from './balanceOf'
import { createApproveCaller } from './approve'

export type PropertyContract = {
	readonly author: () => Promise<string>
	readonly balanceOf: (address: string) => Promise<string>
	readonly transfer: (to: string, value: string) => Promise<boolean>
	readonly approve: (to: string, value: string) => Promise<boolean>
	readonly transferFrom: (
		from: string,
		to: string,
		value: string
	) => Promise<boolean>
	readonly contract: () => Contract
	readonly name: () => Promise<string>
	readonly symbol: () => Promise<string>
	readonly totalSupply: () => Promise<string>
	readonly decimals: () => Promise<string>
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
		balanceOf: createBalanceOfCaller(contractClient),
		approve: createApproveCaller(contractClient, client),
		transfer: createTransferCaller(contractClient, client),
		transferFrom: createTransferFromCaller(contractClient, client),
		name: createNameCaller(contractClient),
		symbol: createSymbolCaller(contractClient),
		totalSupply: createTotalSupplyCaller(contractClient),
		decimals: createDecimalsCaller(contractClient),
		contract: always(contractClient),
	}
}
