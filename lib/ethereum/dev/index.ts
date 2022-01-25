import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { devAbi } from './abi'
import { createTransferCaller } from '../../common/erc20/transfer'
import { createBalanceOfCaller } from '../../common/erc20/balanceOf'
import { createTotalSupplyCaller } from '../../common/erc20/totalSupply'
import { createApproveCaller } from '../../common/erc20/approve'
import { createTransferFromCaller } from '../../common/erc20/transferFrom'
import { createNameCaller } from '../../common/erc20/name'
import { createSymbolCaller } from '../../common/erc20/symbol'
import { createDecimalsCaller } from '../../common/erc20/decimals'
import { createAllowanceCaller } from '../../common/erc20/allowance'
import { createDepositCaller } from './deposit'
import { FallbackableOverrides } from '../../common/utils/execute'

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
	readonly deposit: (
		to: string,
		value: string,
		overrides?: FallbackableOverrides
	) => Promise<boolean>
}

export const createDevContract =
	(provider: Provider | Signer) =>
	(address: string): DevContract => {
		const contract = new ethers.Contract(address, [...devAbi], provider)

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
			deposit: createDepositCaller(contract),
		}
	}
