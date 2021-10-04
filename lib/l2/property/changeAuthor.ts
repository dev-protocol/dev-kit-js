import { ethers } from 'ethers'
import { execute, MutationOption } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateChangeAuthorCaller = (
	contract: ethers.Contract
) => (nextAuther: string) => Promise<boolean>

export const createChangeAuthorCaller: CreateChangeAuthorCaller =
	(contract: ethers.Contract) => async (nextAuther: string) =>
		execute<MutationOption>({
			contract,
			method: 'changeAuthor',
			mutation: true,
			args: [nextAuther],
		}).then(T)
