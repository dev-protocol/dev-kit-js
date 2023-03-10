import { ethers, keccak256 } from 'ethers'
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
	payloads?: ReadonlyArray<string | Uint8Array>,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createSetTokenURIDescriptorCaller: CreateSetTokenURIDescriptorCaller =

		(contract: ethers.Contract) =>
		async (
			propertyAddress: string,
			descriptorAddress: string,
			payloads?: ReadonlyArray<string | Uint8Array>,
			overrides?: FallbackableOverrides
		) =>
			execute<MutationOption>({
				contract,
				method: 'setTokenURIDescriptor',
				mutation: true,
				args: payloads
					? [propertyAddress, descriptorAddress, payloads.map(keccak256)]
					: [propertyAddress, descriptorAddress],
				overrides,
				interface: payloads ? 'address,address,bytes32[]' : 'address,address',
			})
