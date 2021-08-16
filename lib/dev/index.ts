import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { devAbi } from './abi'
import { createTransferCaller } from './transfer'
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

export const createDevContract = (provider: Provider | Signer) => (
	address: string
): DevContract => {
	const contractClient = new ethers.Contract(address, [...devAbi], provider)
	return {
		totalSupply: createTotalSupplyCaller(contractClient),
		balanceOf: createBalanceOfCaller(contractClient),
		transfer: createTransferCaller(contractClient),
		deposit: createDepositCaller(contractClient),
	}
}
