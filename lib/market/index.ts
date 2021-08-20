import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { ethers } from 'ethers'
import { AbiItem } from 'web3-utils'
import { Provider } from '@ethersproject/abstract-provider'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { marketAbi } from './abi'
import { CustomOptions } from '../option'
import { createSchemaCaller } from './schema'
import { createVoteCaller } from './vote'
import { createAuthenticateCaller } from './authenticate'
import { createBehaviorCaller } from './behavior'

export type CreateMarketContract = {
	readonly schema: () => Promise<readonly string[]>
	readonly vote: (
		propertyAddress: string,
		agree: boolean
	) => Promise<TransactionResponse>
	readonly authenticate: (
		address: string,
		args: readonly string[],
		options: {
			readonly metricsFactoryAddress: string
		}
	) => Promise<string>
	readonly behavior: () => Promise<string>
	readonly contract: () => ethers.Contract
}

export const createMarketContract =
	(provider: Provider) =>
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
