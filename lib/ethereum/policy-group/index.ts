import { ContractRunner, ethers } from 'ethers'
import { policyGroupAbi } from './abi'
import { createIsGroupCaller } from './isGroup'

export type PolicyGroupContract = {
	readonly isGroup: (policyAddress: string) => Promise<boolean>
	readonly isDuringVotingPeriod: (policyAddress: string) => Promise<boolean>
	readonly contract: () => ethers.Contract
}

export type CreatePolicyGroupContract = (
	provider: ContractRunner,
) => (address: string) => PolicyGroupContract

export const createPolicyGroupContract: CreatePolicyGroupContract =
	(provider: ContractRunner) => (address: string) => {
		const contract = new ethers.Contract(address, [...policyGroupAbi], provider)
		return {
			isGroup: createIsGroupCaller(contract),
			isDuringVotingPeriod: createIsGroupCaller(contract),
			contract: () => contract,
		}
	}
