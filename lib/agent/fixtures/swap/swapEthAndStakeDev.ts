/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
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
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createSwapEthAndStakeDevCaller: CreateSwapEthAndStakeDevCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'swapEthAndStakeDev',
			mutation: true,
			args: [propertyAddress],
			overrides,
		})
