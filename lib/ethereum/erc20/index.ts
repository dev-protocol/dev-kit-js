/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { always } from 'ramda'
import { Contract } from 'web3-eth-contract/types'
import { erc20Abi } from './abi'
import { CustomOptions } from '../../common/option'
import { createTransferCaller } from './transfer'
import { createBalanceOfCaller } from './balanceOf'
import { createTotalSupplyCaller } from './totalSupply'
import { createApproveCaller } from './approve'
import { createTransferFromCaller } from './transferFrom'
import { createNameCaller } from './name'
import { createSymbolCaller } from './symbol'
import { createDecimalsCaller } from './decimals'
import { createAllowanceCaller } from './allowance'

export type Erc20Contract = {
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
	readonly contract: () => Contract
}

export type CreateErc20Contract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => Erc20Contract

export const createErc20Contract: CreateErc20Contract =
	(client: Web3) =>
	(address?: string, options?: CustomOptions): Erc20Contract => {
		const contractClient: Contract = new client.eth.Contract(
			[...erc20Abi],
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
			contract: always(contractClient),
		}
	}
