/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateIsDuringVotingPeriodCaller = (
	contract: Contract
) => (policyAddress: string) => Promise<boolean>

export const createIsDuringVotingPeriodCaller: CreateIsDuringVotingPeriodCaller =

		(contract: Contract) =>
		async (policyAddress: string): Promise<boolean> =>
			execute({
				contract,
				method: 'isDuringVotingPeriod',
				args: [policyAddress],
			})
