/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers, ZeroAddress, ZeroHash } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../../common/utils/execute'
import type { TransactionResponse } from 'ethers'
import { pathOf } from './path-of'

export type CreateSwapTokensAndStakeDevCaller = (
	contract: ethers.Contract,
) => (
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

export const createSwapTokensAndStakeDevCaller: CreateSwapTokensAndStakeDevCaller =

		(contract: ethers.Contract) =>
		async (
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
		) => {
			const args =
				token && token !== ZeroAddress
					? // Overload: ERC20
					  gatewayAddress && gatewayBasisPoints
						? [
								to,
								token,
								pathOf(path),
								propertyAddress,
								amount,
								amountOut,
								String(deadline),
								payload ?? ZeroHash,
								gatewayAddress,
								gatewayBasisPoints,
						  ]
						: [
								to,
								token,
								pathOf(path),
								propertyAddress,
								amount,
								amountOut,
								String(deadline),
								payload ?? ZeroHash,
						  ]
					: gatewayAddress && gatewayBasisPoints
					? // Overload: Payable
					  [
							to,
							pathOf(path),
							propertyAddress,
							amountOut,
							String(deadline),
							payload ?? ZeroHash,
							gatewayAddress,
							gatewayBasisPoints,
					  ]
					: [
							to,
							pathOf(path),
							propertyAddress,
							amountOut,
							String(deadline),
							payload ?? ZeroHash,
					  ]
			return execute<MutationOption>({
				contract,
				method: 'swapTokensAndStakeDev',
				mutation: true,
				args,
				overrides,
				interface:
					token && token !== ZeroAddress
						? // Overload: ERC20
						  gatewayAddress && gatewayBasisPoints
							? 'address,address,bytes,address,uint256,uint256,uint256,bytes32,address,uint256'
							: 'address,address,bytes,address,uint256,uint256,uint256,bytes32'
						: gatewayAddress && gatewayBasisPoints
						? // Overload: Payable
						  'address,bytes,address,uint256,uint256,bytes32,address,uint256'
						: 'address,bytes,address,uint256,uint256,bytes32',
			})
		}
