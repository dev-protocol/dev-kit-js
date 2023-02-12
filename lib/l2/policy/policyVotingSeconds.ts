import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreatePolicyVotingSecondsCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPolicyVotingSecondsCaller: CreatePolicyVotingSecondsCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption>({
				contract,
				method: 'policyVotingSeconds',
				mutation: false,
			})
		)
