import { ContractRunner, ethers } from 'ethers'
import { swapArbitraryTokensAbi } from './abi'
import { FallbackableOverrides } from '../../../common/utils/execute'
import type { TransactionResponse } from 'ethers'
import { createGetEstimatedDevForTokensCaller } from './getEstimatedDevForTokens'
import { createGetEstimatedTokensForDevCaller } from './getEstimatedTokensForDev'
import { createSwapTokensAndStakeDevCaller } from './swapTokensAndStakeDev'

export type SwapArbitraryTokensContract = {
	readonly getEstimatedDevForTokens: (
		path: readonly (string | bigint)[],
		tokenAmount: string,
	) => Promise<string>
	readonly getEstimatedTokensForDev: (
		path: readonly (string | bigint)[],
		devAmount: string,
	) => Promise<string>
	readonly swapTokensAndStakeDev: (
		to: string,
		path: readonly (string | bigint)[],
		propertyAddress: string,
		amountOut: string,
		deadline: number,
		amount: string,
		payload?: string | Uint8Array,
		token?: string,
		gatewayAddress?: string,
		gatewayBasisPoints?: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export const createSwapArbitraryTokensContract =
	(provider: ContractRunner) =>
	(address: string): SwapArbitraryTokensContract => {
		const contract = new ethers.Contract(
			address,
			[...swapArbitraryTokensAbi],
			provider,
		)

		return {
			getEstimatedDevForTokens: createGetEstimatedDevForTokensCaller(contract),
			getEstimatedTokensForDev: createGetEstimatedTokensForDevCaller(contract),
			swapTokensAndStakeDev: createSwapTokensAndStakeDevCaller(contract),
			contract: () => contract,
		}
	}
