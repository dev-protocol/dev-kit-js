import { ContractRunner, ethers } from 'ethers'
import type { TransactionResponse } from 'ethers'
import { marketAbi } from './abi'
import { createSchemaCaller } from './schema'
import { createVoteCaller } from './vote'
import { createAuthenticateCaller } from './authenticate'
import { createBehaviorCaller } from './behavior'
import { FallbackableOverrides } from '../../common/utils/execute'

export type CreateMarketContract = {
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
	readonly contract: () => ethers.Contract
}

export const createMarketContract =
	(provider: ContractRunner) =>
	(address: string): CreateMarketContract => {
		const contract = new ethers.Contract(address, [...marketAbi], provider)
		return {
			vote: createVoteCaller(contract),
			schema: createSchemaCaller(contract),
			authenticate: createAuthenticateCaller(contract, provider),
			behavior: createBehaviorCaller(contract),
			// eslint-disable-next-line functional/functional-parameters
			contract: () => contract,
		}
	}
