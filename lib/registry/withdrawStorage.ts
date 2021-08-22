import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateWithdrawStorageCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createWithdrawStorageCaller: CreateWithdrawStorageCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'withdrawStorage',
			mutation: false,
		})
	)
