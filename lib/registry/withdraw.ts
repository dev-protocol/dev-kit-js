import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateWithdrawCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createWithdrawCaller: CreateWithdrawCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'withdraw',
			mutation: false,
		})
	)
