import { ethers } from 'ethers'
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'

export type CreateCapSetterCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createCapSetterCaller: CreateCapSetterCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'capSetter',
			mutation: false,
		})
	)
