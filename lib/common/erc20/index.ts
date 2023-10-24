import { ContractRunner, ethers } from 'ethers'
import { erc20Abi } from './abi'
import { createTransferCaller } from './transfer'
import { createBalanceOfCaller } from './balanceOf'
import { createTotalSupplyCaller } from './totalSupply'
import { createApproveCaller } from './approve'
import { createTransferFromCaller } from './transferFrom'
import { createNameCaller } from './name'
import { createSymbolCaller } from './symbol'
import { createDecimalsCaller } from './decimals'
import { createAllowanceCaller } from './allowance'
import { FallbackableOverrides } from '../utils/execute'
import type { TransactionResponse } from 'ethers'

export type Erc20Contract = {
	readonly totalSupply: () => Promise<string>
	readonly balanceOf: (address: string) => Promise<string>
	readonly transfer: (
		to: string,
		value: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly allowance: (from: string, to: string) => Promise<string>
	readonly approve: (
		to: string,
		value: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly transferFrom: (
		from: string,
		to: string,
		value: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly name: () => Promise<string>
	readonly symbol: () => Promise<string>
	readonly decimals: () => Promise<string>
}

export const createErc20Contract =
	(provider: ContractRunner) =>
	(address: string): Erc20Contract => {
		const contract = new ethers.Contract(address, [...erc20Abi], provider)

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
		}
	}
