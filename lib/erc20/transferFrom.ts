import { ethers } from 'ethers'
import { execute, MutationOption } from '../utils/execute'
import { T } from 'ramda'

export type CreateTransferFromCaller = (
	contract: ethers.Contract
) => (from: string, to: string, value: string) => Promise<boolean>

export const createTransferFromCaller: CreateTransferFromCaller =
	(contract: ethers.Contract) =>
	async (from: string, to: string, value: string) =>
		execute<MutationOption>({
			contract,
			method: 'transferFrom',
			mutation: true,
			args: [from, to, value],
		}).then(T)
