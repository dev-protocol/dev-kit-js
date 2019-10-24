import Web3 from 'web3'
import { createMarketContract } from './market'

interface DevkitContract {
	market: ReturnType<typeof createMarketContract>
}

const devkitContract = (client: Web3): DevkitContract => ({
	market: createMarketContract(client)
})

export const contractFactory = (
	host: string,
	timeout?: number
): ReturnType<typeof devkitContract> => {
	const client = new Web3()

	client.setProvider(new Web3.providers.HttpProvider(host, timeout))

	return devkitContract(client)
}
