import Web3 from 'web3'
import Contract from 'web3/eth/contract'
import { marketAbi } from './market-abi'
import { CustomOptions } from './option'

export const createMarketContract = (client: Web3) => (
	address?: string,
	options?: CustomOptions
) => {
	const contractClient: Contract = new client.eth.Contract(marketAbi, address, {
		...options
	})

	return {
		schema: async () =>
			contractClient.methods
				.schema()
				.call()
				.then(result => JSON.parse(result) as string[])
	}
}
