import { ethers } from 'ethers'
import {
	execute,
	MutationOption,
	QueryOption,
} from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateIsDuringVotingPeriodCaller = (
	contract: ethers.Contract,
) => (policyAddress: string) => Promise<boolean>

export const createIsDuringVotingPeriodCaller: CreateIsDuringVotingPeriodCaller =

		(contract: ethers.Contract) =>
		async (policyAddress: string): Promise<boolean> =>
			execute<QueryOption>({
				contract,
				method: 'isDuringVotingPeriod',
				args: [policyAddress],
				mutation: false,
			}).then(T)
