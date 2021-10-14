import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { marketBehaviorAbi } from './abi'
import { createGetIdCaller } from './getId'

export type CreateMarketBehaviorContract = {
	readonly getId: (metricsAddress: string) => Promise<string>
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export const createMarketBehaviorContract =
	(provider: Provider | Signer) =>
	(address: string): CreateMarketBehaviorContract => {
		const contract = new ethers.Contract(
			address,
			[...marketBehaviorAbi],
			provider
		)

		return {
			getId: createGetIdCaller(contract),
		}
	}
