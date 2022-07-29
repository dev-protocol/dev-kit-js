import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'
import { swapAbiV2 } from './abi-v2'
import { swapAbiV3 } from './abi-v3'
import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'
import { createGetEstimatedEthForDevCaller } from './getEstimatedEthForDev'
import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { FallbackableOverrides } from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { always } from 'ramda'
import { createSwapEthAndStakeDevPolygonCaller } from './swapEthAndStakeDevPolygon'
import { swapAbiV2Mainnet } from './abi-v2-mainnet'
import { swapAbiV2Polygon } from './abi-v2-polygon'

export type SwapContract = {
	readonly getEstimatedDevForEth: (ethAmount: string) => Promise<string>
	readonly getEstimatedEthForDev: (devAmount: string) => Promise<string>
	readonly swapEthAndStakeDevCaller: (
		propertyAddress: string,
		deadline: number,
		payload: string,
		overrides: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string
	) => Promise<TransactionResponse>
	readonly swapEthAndStakeDevPolygonCaller: (
		propertyAddress: string,
		amount: string,
		deadline: number,
		payload: string,
		overrides: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createSwapContract =
	(
		provider: BaseProvider,
		v: 'v2' | 'v3' | 'v2_mainnet' | 'v2_polygon' = 'v3'
	) =>
	(address: string): SwapContract => {
		const contract = new ethers.Contract(
			address,
			v === 'v3'
				? [...swapAbiV3]
				: v === 'v2_mainnet'
				? [...swapAbiV2Mainnet]
				: v === 'v2_polygon'
				? [...swapAbiV2Polygon]
				: [...swapAbiV2],
			provider
		)

		return {
			getEstimatedDevForEth: createGetEstimatedDevForEthCaller(contract),
			getEstimatedEthForDev: createGetEstimatedEthForDevCaller(contract),
			swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
			swapEthAndStakeDevPolygonCaller:
				createSwapEthAndStakeDevPolygonCaller(contract),
			contract: always(contract),
		}
	}
