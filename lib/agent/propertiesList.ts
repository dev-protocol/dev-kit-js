import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesList = (options: {
	readonly provider: Provider
	readonly user?: string
}) => Promise<UndefinedOr<readonly string[]>>
