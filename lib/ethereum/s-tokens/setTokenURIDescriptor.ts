import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreateSetTokenURIDescriptorCaller = (
	contract: ethers.Contract
) => (
	propertyAddress: string,
	descriptorAddress: string,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createSetTokenURIDescriptorCaller: CreateSetTokenURIDescriptorCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, descriptorAddress: string, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'setTokenURIDescriptor',
			mutation: true,
			args: [propertyAddress, descriptorAddress],
			overrides,
		})