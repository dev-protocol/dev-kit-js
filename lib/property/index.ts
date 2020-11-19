import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { always } from 'ramda'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createAuthorCaller } from './author'
import { createTransferCaller } from './../erc20/transfer'
import { createNameCaller } from './../erc20/name'
import { createSymbolCaller } from './../erc20/symbol'
import { createTotalSupplyCaller } from './../erc20/totalSupply'
import { createDecimalsCaller } from './../erc20/decimals'
import { createTransferFromCaller } from '../erc20/transferFrom'
import { createBalanceOfCaller } from './../erc20/balanceOf'
import { createApproveCaller } from './../erc20/approve'
import { createAllowanceCaller } from './../erc20/allowance'

export type PropertyContract = {
	readonly author: () => Promise<string>
	readonly balanceOf: (address: string) => Promise<string>
	readonly transfer: (to: string, value: string) => Promise<boolean>
	readonly approve: (to: string, value: string) => Promise<boolean>
	readonly allowance: (from: string, to: string) => Promise<string>
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
		allowance: createAllowanceCaller(contractClient),
		contract: always(contractClient),
	}
}
