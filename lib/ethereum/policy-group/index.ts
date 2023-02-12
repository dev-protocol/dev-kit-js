import { ethers } from 'ethers'
import type { BaseProvider } from '@ethersproject/providers'
import { policyGroupAbi } from './abi'
import { createIsGroupCaller } from './isGroup'
import { always } from 'ramda'

export type PolicyGroupContract = {
	readonly isGroup: (policyAddress: string) => Promise<boolean>
	readonly isDuringVotingPeriod: (policyAddress: string) => Promise<boolean>
	readonly contract: () => ethers.Contract
}

export type CreatePolicyGroupContract = (
	provider: BaseProvider
) => (address: string) => PolicyGroupContract

export const createPolicyGroupContract: CreatePolicyGroupContract =
	(provider: BaseProvider) => (address: string) => {
		const contract = new ethers.Contract(address, [...policyGroupAbi], provider)
		return {
			isGroup: createIsGroupCaller(contract),
			isDuringVotingPeriod: createIsGroupCaller(contract),
			contract: always(contract),
		}
	}
