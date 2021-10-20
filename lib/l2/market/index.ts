import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { marketAbi } from './abi'
import { createSchemaCaller } from '../../ethereum/market/schema'
import { createVoteCaller } from '../../ethereum/market/vote'
import { createAuthenticateCaller } from './authenticate'
import { createBehaviorCaller } from '../../ethereum/market/behavior'
import { createGetAuthenticatedPropertiesCaller } from './getAuthenticatedProperties'
import { FallbackableOverrides } from '../../common/utils/execute'

export type MarketContract = {
	readonly schema: () => Promise<readonly string[]>
	readonly vote: (
		propertyAddress: string,
		agree: boolean,
		overrides?: FallbackableOverrides
	) => Promise<TransactionResponse>
	readonly authenticate: (
		address: string,
		args: readonly string[],
		options: {
			readonly metricsFactoryAddress: string
		},
		overrides?: FallbackableOverrides
	) => Promise<string>
	readonly behavior: () => Promise<string>
	readonly getAuthenticatedProperties: () => Promise<readonly string[]>
}

export const createMarketContract =
	(provider: Provider | Signer) =>
	(address: string): MarketContract => {
		const contract = new ethers.Contract(address, [...marketAbi], provider)
		return {
			vote: createVoteCaller(contract),
			schema: createSchemaCaller(contract),
			authenticate: createAuthenticateCaller(contract, provider),
			behavior: createBehaviorCaller(contract),
			getAuthenticatedProperties:
				createGetAuthenticatedPropertiesCaller(contract),
		}
	}
