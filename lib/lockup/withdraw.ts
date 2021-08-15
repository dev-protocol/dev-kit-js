import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { execute, MutationOption } from '../utils/ethers-execute'
import { T } from 'ramda'

export type CreateWithdrawCaller = (
	contract: ethers.Contract
) => (propertyAddress: string) => Promise<boolean>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: ethers.Contract
) => async (propertyAddress: string) =>
	execute({
		contract,
		method: 'withdraw',
		args: [propertyAddress],
		mutation: true,
	}).then(T)
