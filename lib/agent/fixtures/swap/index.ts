import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { swapAbiV2 } from './abi-v2'
import { swapAbiV3 } from './abi-v3'
import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'
import { createGetEstimatedEthForDevCaller } from './getEstimatedEthForDev'
import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { FallbackableOverrides } from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { always } from 'ramda'

export type SwapContract = {
	readonly getEstimatedDevForEth: (ethAmount: string) => Promise<string>
	readonly getEstimatedEthForDev: (devAmount: string) => Promise<string>
	readonly swapEthAndStakeDevCaller: (
		propertyAddress: string,
		overrides: FallbackableOverrides
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createSwapContract =
	(provider: Provider | Signer, v: 'v2' | 'v3' = 'v3') =>
	(address: string): SwapContract => {
		const contract = new ethers.Contract(
			address,
			v === 'v3' ? [...swapAbiV3] : [...swapAbiV2],
			provider
		)

		return {
			getEstimatedDevForEth: createGetEstimatedDevForEthCaller(contract),
			getEstimatedEthForDev: createGetEstimatedEthForDevCaller(contract),
			swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
			contract: always(contract),
		}
	}
