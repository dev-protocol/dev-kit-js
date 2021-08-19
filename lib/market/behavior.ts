/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { execute, QueryOption } from '../utils/ethers-execute'
import { always } from 'ramda'
import { ethers } from 'ethers'

export type CreateBehaviorCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createBehaviorCaller: CreateBehaviorCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'behavior',
			mutation: false,
		})
	)
