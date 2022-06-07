import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesCreate = (options: {
	readonly provider: BaseProvider
	readonly name: string
	readonly symbol: string
	readonly author: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
