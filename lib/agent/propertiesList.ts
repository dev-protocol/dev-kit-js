import type { BaseProvider } from '@ethersproject/providers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesList = (options: {
	readonly provider: BaseProvider
	readonly user: string
}) => Promise<UndefinedOr<readonly string[]>>
