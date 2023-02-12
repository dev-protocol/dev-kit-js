import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import type { TransactionResponse } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesCreateToAuthenticate = (options: {
	readonly provider: BaseProvider
	readonly name: string
	readonly symbol: string
	readonly author: string
	readonly authentication: {
		readonly market: string
		readonly options: readonly string[]
		readonly overrides?: FallbackableOverrides
	}
	readonly overrides?: FallbackableOverrides
}) => Promise<
	UndefinedOr<
		TransactionResponse & {
			readonly wait: () => Promise<TransactionResponse>
		}
	>
>
