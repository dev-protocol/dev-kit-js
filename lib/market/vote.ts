import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { execute, MutationOption } from '../utils/ethers-execute'

export type CreateVoteCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, agree: boolean) => Promise<TransactionResponse>

export const createVoteCaller: CreateVoteCaller =
	(
		contract: ethers.Contract
	): ((
		propertyAddress: string,
		agree: boolean
	) => Promise<TransactionResponse>) =>
	async (
		propertyAddress: string,
		agree: boolean
	): Promise<TransactionResponse> =>
		execute<MutationOption>({
			contract,
			method: 'vote',
			args: [propertyAddress, agree],
			mutation: true,
		})
