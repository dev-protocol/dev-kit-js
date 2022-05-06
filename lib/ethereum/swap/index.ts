import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { swapAbi } from './abi'
import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'
import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { FallbackableOverrides } from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { always } from 'ramda'

export type SwapContract = {
	readonly getEstimatedDevForEth: (
		ethAmount: string,
	) => Promise<string>
	readonly swapEthAndStakeDevCaller: (
		propertyAddress: string,
		overrides?: FallbackableOverrides
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createSwapContract =
	(provider: Provider | Signer) =>
	(address: string): SwapContract => {
		const contract = new ethers.Contract(address, [...swapAbi], provider)

		return {
			getEstimatedDevForEth: createGetEstimatedDevForEthCaller(contract),
			swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
			contract: always(contract),
		}
	}
