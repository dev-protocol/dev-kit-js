import type { ContractRunner } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Positions } from '../ethereum/s-tokens/positions'

type PositionsGet = (options: {
	readonly provider: ContractRunner
	readonly positionId: number
}) => Promise<UndefinedOr<Positions>>
