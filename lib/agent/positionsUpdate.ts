import { FallbackableOverrides } from '../common/utils/execute'
import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { ApproveIfNeededResult } from './common/approveIfNeeded'

type PositionsUpdate = (options: {
	readonly provider: BaseProvider
	readonly positionId: number
	readonly additionalAmount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<ApproveIfNeededResult>>
