import { FallbackableOverrides } from '../common/utils/execute'
import { Provider, TransactionResponse } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesAuthenticate = (options: {
	readonly provider: Provider
	readonly destination: string
	readonly authentication: {
		readonly market: string
		readonly options: readonly string[]
	}
	readonly overrides?: FallbackableOverrides
}) => Promise<
	UndefinedOr<
		TransactionResponse & {
			readonly wait: () => Promise<TransactionResponse>
		}
	>
>
