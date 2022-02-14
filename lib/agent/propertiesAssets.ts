import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type Asset = {
	readonly market: string
	readonly marketSlug?: string
	readonly id: string
}

type PropertiesAssets = (options: {
	readonly provider: Provider
	readonly destination: string
}) => Promise<UndefinedOr<readonly Asset[]>>
