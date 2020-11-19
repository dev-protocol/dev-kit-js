import Web3 from 'web3'
import { always } from 'ramda'
import { Contract } from 'web3-eth-contract/types'
import { devAbi } from './abi'
import { CustomOptions } from '../option'
import { createTransferCaller } from './../erc20/transfer'
import { createBalanceOfCaller } from './../erc20/balanceOf'
import { createTotalSupplyCaller } from './../erc20/totalSupply'
import { createApproveCaller } from './../erc20/approve'
import { createTransferFromCaller } from '../erc20/transferFrom'
import { createNameCaller } from './../erc20/name'
import { createSymbolCaller } from './../erc20/symbol'
import { createDecimalsCaller } from './../erc20/decimals'
import { createAllowanceCaller } from './../erc20/allowance'
import { createDepositCaller } from './deposit'

export type DevContract = {
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
	readonly deposit: (to: string, value: string) => Promise<boolean>
	readonly contract: () => Contract
}

export type CreateDevContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => DevContract

export const createDevContract: CreateDevContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): DevContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...devAbi],
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
		deposit: createDepositCaller(contractClient, client),
		contract: always(contractClient),
	}
}
