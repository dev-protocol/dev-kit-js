import type { ContractRunner } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Positions } from '../ethereum/s-tokens/positions'

type PositionsList = (options: {
	readonly provider: ContractRunner
	readonly destination?: string
	readonly user?: string
}) => Promise<UndefinedOr<readonly Positions[]>>
