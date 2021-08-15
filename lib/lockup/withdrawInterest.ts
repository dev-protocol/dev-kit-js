import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateWithdrawInterestCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<boolean>

export const createWithdrawInterestCaller: CreateWithdrawInterestCaller = (
	contract: ethers.Contract
) => async (propertyAddress: string) =>
	execute<MutationOption>({
		contract,
		method: 'withdrawInterest',
		args: [propertyAddress],
		mutation: true,
	}).then(T)
