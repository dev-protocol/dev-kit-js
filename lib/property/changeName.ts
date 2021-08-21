import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateChangeNameCaller = (
	contract: ethers.Contract
) => (nextAuther: string) => Promise<boolean>

export const createChangeNameCaller: CreateChangeNameCaller =
	(contract: ethers.Contract) => async (nextName: string) =>
		execute<MutationOption>({
			contract,
			method: 'changeName',
			mutation: true,
			args: [nextName],
		}).then(T)
