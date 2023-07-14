import { ContractRunner, ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { marketAbi } from './abi'
import { createSchemaCaller } from '../../ethereum/market/schema'
import { createVoteCaller } from '../../ethereum/market/vote'
import { createAuthenticateCaller } from './authenticate'
import { createNameCaller } from './name'
import { createBehaviorCaller } from '../../ethereum/market/behavior'
import { createGetAuthenticatedPropertiesCaller } from './getAuthenticatedProperties'
import { FallbackableOverrides } from '../../common/utils/execute'
import { always } from 'ramda'

export type MarketContract = {
	readonly schema: () => Promise<readonly string[]>
	readonly vote: (
		propertyAddress: string,
		agree: boolean,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly authenticate: (
		address: string,
		args: readonly string[],
		options: {
			readonly metricsFactoryAddress: string
		},
		overrides?: FallbackableOverrides,
	) => Promise<string>
	readonly behavior: () => Promise<string>
	readonly name: () => Promise<string>
	readonly getAuthenticatedProperties: () => Promise<readonly string[]>
	readonly contract: () => ethers.Contract
}

export const createMarketContract =
	(provider: ContractRunner) =>
	(address: string): MarketContract => {
		const contract = new ethers.Contract(address, [...marketAbi], provider)
		return {
			vote: createVoteCaller(contract),
			schema: createSchemaCaller(contract),
			authenticate: createAuthenticateCaller(contract, provider),
			behavior: createBehaviorCaller(contract),
			name: createNameCaller(contract),
			getAuthenticatedProperties:
				createGetAuthenticatedPropertiesCaller(contract),
			contract: always(contract),
		}
	}
