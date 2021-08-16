/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { always } from 'ramda'
import { propertyAbi } from './abi'
import { CustomOptions } from '../option'
import { createAuthorCaller } from './author'
import { createChangeAuthorCaller } from './changeAuthor'
import { createChangeNameCaller } from './changeName'
import { createChangeSymbolCaller } from './changeSymbol'
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
	readonly totalSupply: () => Promise<string>
	readonly balanceOf: (address: string) => Promise<string>
	readonly transfer: (to: string, value: string) => Promise<boolean>
	readonly allowance: (from: string, to: string) => Promise<string>
	readonly approve: (to: string, value: string) => Promise<boolean>
	readonly transferFrom: (
		from: string,
		to: string,
		value: string
	) => Promise<boolean>
	readonly name: () => Promise<string>
	readonly symbol: () => Promise<string>
	readonly decimals: () => Promise<string>
	readonly author: () => Promise<string>
	readonly changeAuthor: (nextAuthor: string) => Promise<boolean>
	readonly changeName: (nextName: string) => Promise<boolean>
	readonly changeSymbol: (nextSymbol: string) => Promise<boolean>
	readonly contract: () => Contract
}

export type CreatePropertyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PropertyContract

export const createPropertyContract: CreatePropertyContract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): PropertyContract => {
		const contractClient: Contract = new client.eth.Contract(
			[...propertyAbi],
			address,
			{
				...options,
			}
		)

		return {
			totalSupply: createTotalSupplyCaller(contractClient),
			balanceOf: createBalanceOfCaller(contractClient),
			transfer: createTransferCaller(contractClient, client),
			allowance: createAllowanceCaller(contractClient),
			approve: createApproveCaller(contractClient, client),
			transferFrom: createTransferFromCaller(contractClient, client),
			name: createNameCaller(contractClient),
			symbol: createSymbolCaller(contractClient),
			decimals: createDecimalsCaller(contractClient),
			author: createAuthorCaller(contractClient),
			changeAuthor: createChangeAuthorCaller(contractClient, client),
			changeName: createChangeNameCaller(contractClient, client),
			changeSymbol: createChangeSymbolCaller(contractClient, client),
			contract: always(contractClient),
		}
	}
