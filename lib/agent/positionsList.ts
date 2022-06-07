import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Positions } from '../ethereum/s-tokens/positions'

type PositionsList = (options: {
	readonly provider: BaseProvider
	readonly destination?: string
	readonly user?: string
}) => Promise<UndefinedOr<readonly Positions[]>>
