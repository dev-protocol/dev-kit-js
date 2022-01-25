import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { propertyAbi } from './abi'
import { createAuthorCaller } from './../../ethereum/property/author'
import { createChangeNameCaller } from './../../ethereum/property/changeName'
import { createChangeSymbolCaller } from './../../ethereum/property/changeSymbol'
import { createTransferCaller } from './../../common/erc20/transfer'
import { createNameCaller } from './../../common/erc20/name'
import { createSymbolCaller } from './../../common/erc20/symbol'
import { createTotalSupplyCaller } from './../../common/erc20/totalSupply'
import { createDecimalsCaller } from './../../common/erc20/decimals'
import { createTransferFromCaller } from './../../common/erc20/transferFrom'
import { createBalanceOfCaller } from './../../common/erc20/balanceOf'
import { createApproveCaller } from './../../common/erc20/approve'
import { createAllowanceCaller } from './../../common/erc20/allowance'
import { FallbackableOverrides } from '../../common/utils/execute'

export type PropertyContract = {
	readonly totalSupply: () => Promise<string>
	readonly balanceOf: (address: string) => Promise<string>
	readonly transfer: (
		to: string,
		value: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
	readonly allowance: (from: string, to: string) => Promise<string>
	readonly approve: (
		to: string,
		value: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
	readonly transferFrom: (
		from: string,
		to: string,
		value: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
	readonly name: () => Promise<string>
	readonly symbol: () => Promise<string>
	readonly decimals: () => Promise<string>
	readonly author: () => Promise<string>
	readonly changeName: (
		nextName: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
	readonly changeSymbol: (
		nextSymbol: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
}

export type CreatePropertyContract = (
	provider: Provider | Signer
) => (address: string) => PropertyContract

export const createPropertyContract: CreatePropertyContract =
	(provider: Provider | Signer) =>
	(address: string): PropertyContract => {
		const contract = new ethers.Contract(address, [...propertyAbi], provider)

		return {
			totalSupply: createTotalSupplyCaller(contract),
			balanceOf: createBalanceOfCaller(contract),
			transfer: createTransferCaller(contract),
			allowance: createAllowanceCaller(contract),
			approve: createApproveCaller(contract),
			transferFrom: createTransferFromCaller(contract),
			name: createNameCaller(contract),
			symbol: createSymbolCaller(contract),
			decimals: createDecimalsCaller(contract),
			author: createAuthorCaller(contract),
			changeName: createChangeNameCaller(contract),
			changeSymbol: createChangeSymbolCaller(contract),
		}
	}
