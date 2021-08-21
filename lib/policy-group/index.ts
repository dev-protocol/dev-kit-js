import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policyGroupAbi } from './abi'
import { createIsGroupCaller } from './isGroup'

export type PolicyGroupContract = {
	readonly isGroup: (policyAddress: string) => Promise<boolean>
	readonly isDuringVotingPeriod: (policyAddress: string) => Promise<boolean>
}

export type CreatePolicyGroupContract = (
	provider: Provider | Signer
) => (address: string) => PolicyGroupContract

export const createPolicyGroupContract: CreatePolicyGroupContract =
	(provider: Provider | Signer) => (address: string) => {
		const contract = new ethers.Contract(address, [...policyGroupAbi], provider)
		return {
			isGroup: createIsGroupCaller(contract),
			isDuringVotingPeriod: createIsGroupCaller(contract),
		}
	}
