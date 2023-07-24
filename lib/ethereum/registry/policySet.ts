import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreatePolicySetCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createPolicySetCaller: CreatePolicySetCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'policySet',
			mutation: false,
		}),
	)
