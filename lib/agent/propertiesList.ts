import type { ContractRunner } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesList = (options: {
	readonly provider: ContractRunner
	readonly user: string
}) => Promise<UndefinedOr<readonly string[]>>
