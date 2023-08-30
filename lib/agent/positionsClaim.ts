import type { TransactionResponse } from 'ethers'
import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PositionsClaim = (options: {
	readonly provider: BaseProvider
	readonly positionId: number
	readonly withdrawalAmount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
