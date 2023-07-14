/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateTotalLockedCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createTotalLockedCaller: CreateTotalLockedCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({ contract, method: 'totalLocked', mutation: false }),
	)
