import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'
import { Positions } from '../ethereum/s-tokens/positions'

type PositionsList = (options: {
	readonly provider: Provider
	readonly destination?: string
	readonly user?: string
}) => Promise<UndefinedOr<readonly Positions[]>>
