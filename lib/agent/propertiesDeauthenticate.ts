import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import type { TransactionResponse } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesDeauthenticate = (options: {
	readonly provider: BaseProvider
	readonly destination: string
	readonly authentication: {
		readonly market: string
		readonly id: string
	}
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
