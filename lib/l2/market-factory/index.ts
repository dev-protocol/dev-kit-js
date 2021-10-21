import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { marketFactoryAbi } from './abi'
import { createCreateCaller } from '../../ethereum/market-factory/create'
import { createListEnabledMarketsCaller } from './listEnabledMarkets'

export type MarketFactoryContract = {
	readonly create: (marketBehaviorAddress: string) => Promise<boolean>
	readonly listEnabledMarkets: () => Promise<readonly string[]>
}

export const createMarketFactoryContract =
	(provider: Provider | Signer) =>
	(address: string): MarketFactoryContract => {
		const contract = new ethers.Contract(
			address,
			[...marketFactoryAbi],
			provider
		)
		return {
			create: createCreateCaller(contract),
			listEnabledMarkets: createListEnabledMarketsCaller(contract),
		}
	}
