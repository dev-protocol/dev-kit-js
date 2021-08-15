import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateCancelCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<boolean>

export const createCancelCaller: CreateCancelCaller = (
	contract: ethers.Contract
) => async (propertyAddress: string) =>
	execute<MutationOption>({
		contract,
		method: 'cancel',
		args: [propertyAddress],
		mutation: true,
	}).then(T)
