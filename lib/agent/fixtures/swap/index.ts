import { ContractRunner, ethers } from 'ethers'
import { swapAbiV2 } from './abi-v2'
import { swapAbiV3 } from './abi-v3'
import { createGetEstimatedDevForEthCaller } from './getEstimatedDevForEth'
import { createGetEstimatedEthForDevCaller } from './getEstimatedEthForDev'
import { createSwapEthAndStakeDevCaller } from './swapEthAndStakeDev'
import { FallbackableOverrides } from '../../../common/utils/execute'
import type { TransactionResponse } from 'ethers'
import { always } from 'ramda'
import { createSwapEthAndStakeDevPolygonCaller } from './swapEthAndStakeDevPolygon'
import { swapAbiV3Polygon } from './abi-v3-polygon'

export type SwapContract = {
	readonly getEstimatedDevForEth: (ethAmount: string) => Promise<string>
	readonly getEstimatedEthForDev: (devAmount: string) => Promise<string>
	readonly swapEthAndStakeDevCaller: (
		propertyAddress: string,
		deadline: number,
		payload: string | Uint8Array,
		overrides: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string,
	) => Promise<TransactionResponse>
	readonly swapEthAndStakeDevPolygonCaller: (
		propertyAddress: string,
		amount: string,
		deadline: number,
		payload: string | Uint8Array,
		overrides: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string,
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createSwapContract =
	(provider: ContractRunner, v: 'v2' | 'v3' | 'v3_polygon' = 'v3') =>
	(address: string): SwapContract => {
		const contract = new ethers.Contract(
			address,
			v === 'v3'
				? [...swapAbiV3]
				: v === 'v3_polygon'
				? [...swapAbiV3Polygon]
				: [...swapAbiV2],
			provider,
		)

		return {
			getEstimatedDevForEth: createGetEstimatedDevForEthCaller(contract),
			getEstimatedEthForDev: createGetEstimatedEthForDevCaller(contract),
			swapEthAndStakeDevCaller: createSwapEthAndStakeDevCaller(contract),
			swapEthAndStakeDevPolygonCaller:
				createSwapEthAndStakeDevPolygonCaller(contract),
			contract: () => contract,
		}
	}
