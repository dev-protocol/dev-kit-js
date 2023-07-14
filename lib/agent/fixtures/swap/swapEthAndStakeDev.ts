/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ZeroHash, ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateSwapEthAndStakeDevCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	deadline: number,
	payload?: string,
	overrides?: FallbackableOverrides,
	gatewayAddress?: string,
	gatewayBasisPoints?: string
) => Promise<TransactionResponse>

export const createSwapEthAndStakeDevCaller: CreateSwapEthAndStakeDevCaller =
	(contract: ethers.Contract) =>
	async (
		propertyAddress: string,
		deadline: number,
		payload?: string,
		overrides?: FallbackableOverrides,
		gatewayAddress?: string,
		gatewayBasisPoints?: string
	) => {
		const args =
			gatewayAddress && gatewayBasisPoints
				? [
						propertyAddress,
						String(deadline),
						payload ?? ZeroHash,
						gatewayAddress,
						gatewayBasisPoints,
				  ]
				: [propertyAddress, String(deadline), payload ?? ZeroHash]

		return execute<MutationOption>({
			contract,
			method: 'swapEthAndStakeDev',
			mutation: true,
			args,
			overrides,
			interface:
				gatewayAddress && gatewayBasisPoints
					? 'address,uint256,bytes32,address,uint256'
					: 'address,uint256,bytes32',
		})
	}
