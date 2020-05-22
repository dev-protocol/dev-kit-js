import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { marketAbi } from './abi'
import { CustomOptions } from '../option'
import { createSchemaCaller } from './schema'
import { createVoteCaller } from './vote'
import { createAuthenticateCaller } from './authenticate'
import { TxReceipt } from '../utils/web3-txs'

export type CreateMarketContract = {
	readonly schema: () => Promise<readonly string[]>
	readonly vote: (propertyAddress: string, agree: boolean) => Promise<TxReceipt>
	readonly authenticate: (
		address: string,
		args: readonly string[],
		options: {
			readonly metricsFactory: string
		}
	) => Promise<string>
}

export const createMarketContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateMarketContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...marketAbi],
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
