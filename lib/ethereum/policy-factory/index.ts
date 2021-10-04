import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policyFactoryAbi } from './abi'
import { createCreateCaller } from './create'
import { createForceAttachCaller } from './forceAttach'

export type PolicyFactoryContract = {
	readonly create: (newPolicyAddress: string) => Promise<boolean>
	readonly forceAttach: (policy: string) => Promise<boolean>
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
