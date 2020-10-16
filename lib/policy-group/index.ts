import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { policyGroupAbi } from './abi'
import { CustomOptions } from '../option'
import { createVotingCaller } from './voting'
import { createIsGroupCaller } from './isGroup'

export type PolicyGroupContract = {
	readonly voting: (policyAddress: string) => Promise<boolean>
	readonly isGroup: (policyAddress: string) => Promise<boolean>
}

export type CreatePolicyGroupContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PolicyGroupContract

export const createPolicyGroupContract: CreatePolicyGroupContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => {
	const contractClient: Contract = new client.eth.Contract(
		[...policyGroupAbi],
		address,
		{
			...options,
		}
	)

	return {
		voting: createVotingCaller(contractClient),
		isGroup: createIsGroupCaller(contractClient),
	}
}
