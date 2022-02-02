import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policyGroupAbi } from './abi'
import { createIsGroupCaller } from './isGroup'
import { always } from 'ramda'

export type PolicyGroupContract = {
	readonly isGroup: (policyAddress: string) => Promise<boolean>
	readonly isDuringVotingPeriod: (policyAddress: string) => Promise<boolean>
	readonly contract: () => ethers.Contract
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
			contract: always(contract),
		}
	}
