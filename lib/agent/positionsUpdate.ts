import { FallbackableOverrides } from '../common/utils/execute'
import type { ContractRunner } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { ApproveIfNeededResult } from './common/approveIfNeeded'

type PositionsUpdate = (options: {
	readonly provider: ContractRunner
	readonly positionId: number
	readonly additionalAmount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<ApproveIfNeededResult>>
