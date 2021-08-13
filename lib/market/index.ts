import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { ethers } from 'ethers'
import { AbiItem } from 'web3-utils'
import { Provider } from '@ethersproject/abstract-provider'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { marketAbi } from './abi'
import { CustomOptions } from '../option'
import { createSchemaCaller } from './schema'
import { createVoteCaller } from './vote'
import { createAuthenticateCaller } from './authenticate'

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
			readonly metricsFactory: string
		}
	) => Promise<string>
}

export const createMarketContract = (client: Web3) => (
	address: string,
	options?: CustomOptions
): CreateMarketContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...(marketAbi as readonly AbiItem[])],
		address,
		{
			...options,
		}
	)

	return {
		schema: createSchemaCaller(contractClient),
		authenticate: createAuthenticateCaller(contractClient, client),
	} as any
}

export const createEthersMarketContract = (provider: Provider | Signer) => (
	address: string
): CreateMarketContract => {
	const contract = new ethers.Contract(address, [...marketAbi], provider)
	return {
		vote: createVoteCaller(contract),
	}
}
