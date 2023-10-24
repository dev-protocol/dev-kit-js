import type { ContractRunner } from 'ethers'

export type CustomOptions = {
	readonly from?: string
	readonly gasPrice?: string
	readonly gas: number
	readonly data: string
}

export type ValidProvider = ContractRunner
