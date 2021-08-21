import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreatePolicyGroupCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createPolicyGroupCaller: CreatePolicyGroupCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'policyGroup',
			mutation: false,
		})
	)
