import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { marketAbi } from './abi'
import { CustomOptions } from '../option'
import { createSchemaCaller } from './schema'
import { createCalculateCaller } from './calculate'
import { createVoteCaller } from './vote'
import { createAuthenticateCaller } from './authenticate'

export interface CreateMarketContract {
	schema: () => Promise<string[]>
	calculate: (metrics: string, start: string, end: string) => Promise<boolean>
	vote: (tokenNumber: string) => Promise<void>
	authenticate: (address: string, args: string[]) => Promise<string>
}

export const createMarketContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
): CreateMarketContract => {
	const contractClient: Contract = new client.eth.Contract(marketAbi, address, {
		...options
	})

	return {
		schema: createSchemaCaller(contractClient),
		calculate: createCalculateCaller(contractClient),
		vote: createVoteCaller(contractClient, client),
		authenticate: createAuthenticateCaller(contractClient, client)
	}
}
