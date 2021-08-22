import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { T } from 'ramda'

export type CreateIsGroupCaller = (
	contract: ethers.Contract
) => (policyAddress: string) => Promise<boolean>

export const createIsGroupCaller: CreateIsGroupCaller =
	(contract: ethers.Contract) =>
	async (policyAddress: string): Promise<boolean> =>
		execute<QueryOption>({
			contract,
			method: 'isGroup',
			args: [policyAddress],
			mutation: false,
		}).then(T)
