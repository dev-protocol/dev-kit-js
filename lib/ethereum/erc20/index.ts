import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
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
}

export const createErc20Contract =
	(provider: Provider | Signer) =>
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
