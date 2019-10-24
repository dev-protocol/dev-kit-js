import Web3 from 'web3'
import { createMarketContract } from './market'

export interface DevkitContract {
	market: ReturnType<typeof createMarketContract>
}

export const createDevkitContract = (client: Web3): DevkitContract => ({
	market: createMarketContract(client)
})

export const contractFactory = (
	host: string,
	timeout?: number
): DevkitContract => {
	const client = new Web3()

	client.setProvider(new Web3.providers.HttpProvider(host, timeout))

	return createDevkitContract(client)
}
