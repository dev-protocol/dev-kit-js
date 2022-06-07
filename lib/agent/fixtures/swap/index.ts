import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'
import { swapAbi } from './abi'
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
	(provider: BaseProvider) =>
	(address: string): SwapContract => {
		const contract = new ethers.Contract(address, [...swapAbi], provider)

		return {
			getEstimatedDevForEth: createGetEstimatedDevForEthCaller(contract),
			getEstimatedEthForDev: createGetEstimatedEthForDevCaller(contract),
			swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
			contract: always(contract),
		}
	}
