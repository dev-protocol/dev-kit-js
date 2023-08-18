/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateSwapEthAndStakeDevPolygonCaller = (
	contract: ethers.Contract,
) => (
	propertyAddress: string,
	amount: string,
	deadline: number,
	payload: string | Uint8Array,
	overrides: FallbackableOverrides,
	gatewayAddress?: string,
	gatewayBasisPoints?: string,
) => Promise<TransactionResponse>

export const createSwapEthAndStakeDevPolygonCaller: CreateSwapEthAndStakeDevPolygonCaller =

		(contract: ethers.Contract) =>
		async (
			propertyAddress: string,
			amount: string,
			deadline: number,
			payload: string | Uint8Array,
			overrides: FallbackableOverrides,
			gatewayAddress?: string,
			gatewayBasisPoints?: string,
		) =>
			execute<MutationOption>({
				contract,
				method: 'swapEthAndStakeDev',
				mutation: true,
				args:
					gatewayAddress && gatewayBasisPoints
						? [
								propertyAddress,
								amount,
								String(deadline),
								payload,
								gatewayAddress,
								gatewayBasisPoints,
						  ]
						: [propertyAddress, amount, String(deadline), payload],
				overrides,
				interface:
					gatewayAddress && gatewayBasisPoints
						? 'address,uint256,uint256,bytes32,address,uint256'
						: 'address,uint256,uint256,bytes32',
			})
