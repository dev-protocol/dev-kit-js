import { ContractRunner, ethers } from 'ethers'
import { marketFactoryAbi } from './abi'
import { createCreateCaller } from './create'
import { FallbackableOverrides } from '../../common/utils/execute'
import type { TransactionResponse } from 'ethers'

export type MarketFactoryContract = {
	readonly create: (
		marketBehaviorAddress: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createMarketFactoryContract =
	(provider: ContractRunner) =>
	(address: string): MarketFactoryContract => {
		const contract = new ethers.Contract(
			address,
			[...marketFactoryAbi],
			provider,
		)
		return {
			create: createCreateCaller(contract),
			contract: () => contract,
		}
	}
