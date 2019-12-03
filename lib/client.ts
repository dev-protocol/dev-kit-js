import Web3 from 'web3'
import { Provider } from 'web3/providers'
import { createMarketContract } from './market/index'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createAllocatorContract } from './allocator/index'

export interface DevkitContract {
	allocator: ReturnType<typeof createAllocatorContract>
	market: ReturnType<typeof createMarketContract>
	property: ReturnType<typeof createPropertyContract>
	propertyFactory: ReturnType<typeof createPropertyFactoryContract>
}

export const createDevkitContract = (client: Web3): DevkitContract => ({
	allocator: createAllocatorContract(client),
	market: createMarketContract(client),
	property: createPropertyContract(client),
	propertyFactory: createPropertyFactoryContract(client)
})

export const contractFactory = (provider: Provider): DevkitContract => {
	const client = new Web3(provider)

	return createDevkitContract(client)
}
