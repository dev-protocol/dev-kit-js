import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateForceAttachCaller = (
	contract: ethers.Contract
) => (policy: string) => Promise<boolean>

export const createForceAttachCaller: CreateForceAttachCaller =
	(contract: ethers.Contract) => async (policy: string) =>
		execute<MutationOption>({
			contract,
			method: 'forceAttach',
			mutation: true,
			args: [policy],
		}).then(T)
