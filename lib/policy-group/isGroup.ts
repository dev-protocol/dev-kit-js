import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreateIsGroupCaller = (
	contract: Contract
) => (policyAddress: string) => Promise<boolean>

export const createIsGroupCaller: CreateIsGroupCaller = (
	contract: Contract
) => async (policyAddress: string): Promise<boolean> =>
	execute({
		contract,
		method: 'isGroup',
		args: [policyAddress],
	})
