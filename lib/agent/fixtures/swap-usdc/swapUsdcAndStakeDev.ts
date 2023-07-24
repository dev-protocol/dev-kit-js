/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers, ZeroHash } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateSwapUsdcAndStakeDevCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	amount: string,
	amountOut: string,
	deadline: number,
	payload: string,
	overrides: FallbackableOverrides,
	gatewayAddress?: string,
	gatewayBasisPoints?: string,
) => Promise<TransactionResponse>

export const createSwapUsdcAndStakeDevCaller: CreateSwapUsdcAndStakeDevCaller =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		amount: string,
		amountOut: string,
		deadline: number,
		payload: string,
		overrides: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string,
	) => {
		const args =
			gatewayAddress && gatewayBasisPoints
				? [
						propertyAddress,
						amount,
						amountOut,
						String(deadline),
						payload ?? ZeroHash,
						gatewayAddress,
						gatewayBasisPoints,
				  ]
				: [
						propertyAddress,
						amount,
						amountOut,
						String(deadline),
						payload ?? ZeroHash,
				  ]
		return execute<MutationOption>({
			contract,
			method: 'swapUsdcAndStakeDev',
			mutation: true,
			args,
			overrides,
			interface:
				gatewayAddress && gatewayBasisPoints
					? 'address,uint256,uint256,uint256,bytes32,address,uint256'
					: 'address,uint256,uint256,uint256,bytes32',
		})
	}
