import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import type { TransactionResponse } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesAuthenticate = (options: {
	readonly provider: BaseProvider
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
