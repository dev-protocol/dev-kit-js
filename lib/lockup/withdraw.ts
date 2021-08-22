import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/execute'
import { T } from 'ramda'

export type CreateWithdrawCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, amount: string) => Promise<boolean>

export const createWithdrawCaller: CreateWithdrawCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string, amount: string) =>
		execute<MutationOption>({
			contract,
			method: 'withdraw',
			mutation: true,
			args: [propertyAddress, amount],
		}).then(T)
