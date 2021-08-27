import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/execute'
import { always } from 'ramda'

export type CreateLockupStorageCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createLockupStorageCaller: CreateLockupStorageCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({ contract, method: 'lockupStorage', mutation: false })
	)
