import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateCreateCaller = (
	contract: ethers.Contract
) => (marketBehaviorAddress: string) => Promise<boolean>

export const createCreateCaller: CreateCreateCaller =
	(contract: ethers.Contract) => async (marketBehaviorAddress: string) =>
		execute<MutationOption>({
			contract,
			method: 'create',
			mutation: true,
			args: [marketBehaviorAddress],
		}).then(T)
