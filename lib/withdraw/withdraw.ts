import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateWithdrawCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<boolean>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: ethers.Contract
) => async (propertyAddress) =>
	execute<MutationOption>({
		contract,
		method: 'withdraw',
		mutation: true,
		args: [propertyAddress],
	}).then(T)
