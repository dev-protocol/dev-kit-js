import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateTokenCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createTokenCaller: CreateTokenCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'token',
			mutation: false,
		})
	)
