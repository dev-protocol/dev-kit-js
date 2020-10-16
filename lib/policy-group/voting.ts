import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateVotingCaller = (
	contract: Contract
) => (policyAddress: string) => Promise<boolean>

export const createVotingCaller: CreateVotingCaller = (
	contract: Contract
) => async (policyAddress: string): Promise<boolean> =>
	execute({
		contract,
		method: 'voting',
		args: [policyAddress],
	})
