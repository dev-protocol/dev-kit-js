import { ethers } from 'ethers'
import {
	execute,
	MutationReturn,
	MutationOption,
} from '../utils/ethers-execute'

export type CreateVoteEthersCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, agree: boolean) => Promise<MutationReturn>

export const createVoteEthersCaller: CreateVoteEthersCaller = (
	contract: ethers.Contract
): ((
	propertyAddress: string,
	agree: boolean
) => Promise<MutationReturn>) => async (
	propertyAddress: string,
	agree: boolean
): Promise<MutationReturn> =>
	execute<MutationOption>({
		contract,
		method: 'vote',
		args: [propertyAddress, agree],
		mutation: true,
	})
