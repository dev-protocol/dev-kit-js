import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Positions } from '../ethereum/s-tokens/positions'

type PositionsGet = (options: {
	readonly provider: BaseProvider
	readonly positionId: number
}) => Promise<UndefinedOr<Positions>>
