import type { TransactionResponse } from 'ethers'
import { FallbackableOverrides } from '../common/utils/execute'
import type { ContractRunner } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PositionsClaim = (options: {
	readonly provider: ContractRunner
	readonly positionId: number
	readonly withdrawalAmount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
