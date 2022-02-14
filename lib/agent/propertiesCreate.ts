import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesCreate = (options: {
	readonly provider: Provider
	readonly name: string
	readonly symbol: string
	readonly author: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
