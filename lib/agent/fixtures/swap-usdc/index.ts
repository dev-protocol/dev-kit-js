import { ContractRunner, ethers } from 'ethers'
import { swapUsdcAbi } from './abi'
import { FallbackableOverrides } from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { always } from 'ramda'
import { createGetEstimatedDevForUsdcCaller } from './getEstimatedDevForUsdc'
import { createGetEstimatedUsdcForDevCaller } from './getEstimatedUsdcForDev'
import { createSwapUsdcAndStakeDevCaller } from './swapUsdcAndStakeDev'

export type SwapUsdcContract = {
	readonly getEstimatedDevForUsdc: (usdcAmount: string) => Promise<string>
	readonly getEstimatedUsdcForDev: (devAmount: string) => Promise<string>
	readonly swapUsdcAndStakeDevCaller: (
		propertyAddress: string,
		amount: string,
		amountOut: string,
		deadline: number,
		payload: string,
		overrides: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string,
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createSwapUsdcContract =
	(provider: ContractRunner) =>
	(address: string): SwapUsdcContract => {
		const contract = new ethers.Contract(address, [...swapUsdcAbi], provider)

		return {
			getEstimatedDevForUsdc: createGetEstimatedDevForUsdcCaller(contract),
			getEstimatedUsdcForDev: createGetEstimatedUsdcForDevCaller(contract),
			swapUsdcAndStakeDevCaller: createSwapUsdcAndStakeDevCaller(contract),
			contract: always(contract),
		}
	}
