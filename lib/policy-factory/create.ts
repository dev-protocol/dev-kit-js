import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/execute'
import { T } from 'ramda'

export type CreateCreateCaller = (
	contract: ethers.Contract
) => (newPolicyAddress: string) => Promise<boolean>

export const createCreateCaller: CreateCreateCaller =
	(contract: ethers.Contract) => async (newPolicyAddress: string) =>
		execute<MutationOption>({
			contract,
			method: 'create',
			mutation: true,
			args: [newPolicyAddress],
		}).then(T)
