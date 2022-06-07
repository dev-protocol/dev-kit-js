import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'

type Asset = {
	readonly market: string
	readonly marketSlug?: string
	readonly id: string
}

type PropertiesAssets = (options: {
	readonly provider: BaseProvider
	readonly destination: string
}) => Promise<UndefinedOr<readonly Asset[]>>
