import type { BaseProvider } from '@ethersproject/providers'

export type CustomOptions = {
	readonly from?: string
	readonly gasPrice?: string
	readonly gas: number
	readonly data: string
}

export type ValidProvider = BaseProvider
