import { FallbackableOverrides } from '../common/utils/execute'
import type { ContractRunner } from 'ethers'
import type { TransactionResponse } from 'ethers'
import { UndefinedOr } from '@devprotocol/util-ts'

type PropertiesDeauthenticate = (options: {
	readonly provider: ContractRunner
	readonly destination: string
	readonly authentication: {
		readonly market: string
		readonly id: string
	}
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>
