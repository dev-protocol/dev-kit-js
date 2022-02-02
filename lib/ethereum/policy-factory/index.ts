import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policyFactoryAbi } from './abi'
import { createCreateCaller } from './create'
import { createForceAttachCaller } from './forceAttach'
import { FallbackableOverrides } from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type PolicyFactoryContract = {
	readonly create: (
		newPolicyAddress: string,
		overrides?: FallbackableOverrides
	) => Promise<TransactionResponse>
	readonly forceAttach: (
		policy: string,
		overrides?: FallbackableOverrides
	) => Promise<TransactionResponse>
}

export type CreatePolicyFactoryContract = (
	provider: Provider | Signer
) => (address: string) => PolicyFactoryContract

export const createPolicyFactoryContract: CreatePolicyFactoryContract =
	(provider: Provider | Signer) => (address: string) => {
		const contract = new ethers.Contract(
			address,
			[...policyFactoryAbi],
			provider
		)

		return {
			create: createCreateCaller(contract),
			forceAttach: createForceAttachCaller(contract),
		}
	}
