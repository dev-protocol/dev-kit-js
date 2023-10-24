import type { TransactionResponse } from 'ethers'
import { FallbackableOverrides } from '../common/utils/execute'
import type { ContractRunner } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesCreate = (options: {
	readonly provider: ContractRunner
	readonly name: string
	readonly symbol: string
	readonly author: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
