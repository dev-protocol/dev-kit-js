import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateCapCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createCapCaller: CreateCapCaller = (contract: ethers.Contract) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'cap',
			mutation: false,
		})
	)
