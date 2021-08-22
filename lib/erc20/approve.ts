import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/execute'
import { T } from 'ramda'

export type CreateApproveCaller = (
	contract: ethers.Contract
) => (to: string, value: string) => Promise<boolean>

export const createApproveCaller: CreateApproveCaller =
	(contract: ethers.Contract) => async (to: string, value: string) =>
		execute<MutationOption>({
			contract,
			method: 'approve',
			mutation: true,
			args: [to, value],
		}).then(T)
