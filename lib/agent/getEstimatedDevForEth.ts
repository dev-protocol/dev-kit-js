import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type GetEstimatedDevForEth = (options: {
	readonly provider: Provider
	readonly ethAmount: string
}) => Promise<UndefinedOr<string>>
