import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateLockupCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createLockupCaller: CreateLockupCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'lockup',
			mutation: false,
		}),
	)
