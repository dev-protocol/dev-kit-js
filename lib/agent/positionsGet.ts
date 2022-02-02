import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Positions } from '../ethereum/s-tokens/positions'

type PositionsGet = (options: {
	readonly provider: Provider
	readonly positionId: number
}) => Promise<UndefinedOr<Positions>>
