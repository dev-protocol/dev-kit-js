import { ethers } from 'ethers'
import { execute, MutationOption } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateDepositCaller = (
	contract: ethers.Contract
) => (to: string, value: string) => Promise<boolean>

export const createDepositCaller: CreateDepositCaller =
	(contract: ethers.Contract) => async (to: string, value: string) =>
		execute<MutationOption>({
			contract,
			method: 'deposit',
			args: [to, value],
			mutation: true,
		}).then(T)
