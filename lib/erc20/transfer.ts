import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/execute'
import { T } from 'ramda'

export type CreateTransferCaller = (
	contract: ethers.Contract
) => (to: string, value: string) => Promise<boolean>

export const createTransferCaller: CreateTransferCaller =
	(contract: ethers.Contract) => async (to: string, value: string) =>
		execute<MutationOption>({
			contract,
			method: 'transfer',
			args: [to, value],
			mutation: true,
		}).then(T)
