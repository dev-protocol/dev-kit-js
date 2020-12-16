/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'

export type CreatePolicyApprovalCaller = (
	contract: Contract
) => (agree: string, opposite: string) => Promise<boolean>

export const createPolicyApprovalCaller: CreatePolicyApprovalCaller = (
	contract: Contract
) => async (agree: string, opposite: string): Promise<boolean> =>
	execute({
		contract,
		method: 'policyApproval',
		args: [agree, opposite],
	})
