import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type PositionsClaim = (options: {
	readonly provider: Provider
	readonly positionId: number
	readonly withdrawalAmount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
