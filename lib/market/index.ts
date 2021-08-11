import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { ethers } from 'ethers'
import { AbiItem } from 'web3-utils'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { marketAbi } from './abi'
import { CustomOptions } from '../option'
import { createSchemaCaller } from './schema'
import { createVoteCaller } from './vote'
import { createVoteEthersCaller } from './vote-ethers'
import { createAuthenticateCaller } from './authenticate'
import { TxReceipt } from '../utils/web3-txs'
import { MutationReturn } from '../utils/ethers-execute'

export type CreateMarketContract = {
	readonly schema: () => Promise<readonly string[]>
	readonly vote: (
		propertyAddress: string,
		agree: boolean
	) => Promise<TxReceipt> | Promise<MutationReturn>
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
		vote: createVoteCaller(contractClient, client),
		authenticate: createAuthenticateCaller(contractClient, client),
	}
}

export const createEthersMarketContract = (provider: Provider | Signer) => (
	address: string
): CreateMarketContract => {
	const contract = new ethers.Contract(address, [...marketAbi], provider)
	return {
		vote: createVoteEthersCaller(contract),
	}
}
