import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateOwnerCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createOwnerCaller: CreateOwnerCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'owner',
			mutation: false,
		})
	)
