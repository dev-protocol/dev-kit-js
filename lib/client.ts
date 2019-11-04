import Web3 from 'web3'
import { createMarketContract } from './market/index'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'

export interface DevkitContract {
	market: ReturnType<typeof createMarketContract>
	property: ReturnType<typeof createPropertyContract>
	propertyFactory: ReturnType<typeof createPropertyFactoryContract>
}

export const createDevkitContract = (client: Web3): DevkitContract => ({
	market: createMarketContract(client),
	property: createPropertyContract(client),
	propertyFactory: createPropertyFactoryContract(client)
})

export const contractFactory = (
	host: string,
	timeout?: number
): DevkitContract => {
	const client = new Web3()

	client.setProvider(new Web3.providers.HttpProvider(host, timeout))

	return createDevkitContract(client)
}
