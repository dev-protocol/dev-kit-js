/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { agentAddresses } from '../../common/agentAddresses'

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
		const isV2Mainnet = agentAddresses.eth.main.swap.v2 === contract.address // The mainnet contract uses still legacy version
		const args = isV2Mainnet
			? [propertyAddress]
			: gatewayAddress && gatewayBasisPoints
			? [
					propertyAddress,
					String(deadline),
					payload ?? ethers.constants.HashZero,
					gatewayAddress,
					gatewayBasisPoints,
			  ]
			: [
					propertyAddress,
					String(deadline),
					payload ?? ethers.constants.HashZero,
			  ]

		return execute<MutationOption>({
			contract,
			method: 'swapEthAndStakeDev',
			mutation: true,
			args,
			overrides,
			interface: isV2Mainnet
				? undefined
				: gatewayAddress && gatewayBasisPoints
				? 'address,uint256,bytes32,address,uint256'
				: 'address,uint256,bytes32',
		})
	}
