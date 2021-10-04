import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreatePolicyVotingBlocksCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPolicyVotingBlocksCaller: CreatePolicyVotingBlocksCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'policyVotingBlocks',
			mutation: false,
		})
	)
