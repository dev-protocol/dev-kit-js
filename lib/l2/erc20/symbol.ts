import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateSymbolCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createSymbolCaller: CreateSymbolCaller = (
	contract: ethers.Contract
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'symbol',
			mutation: false,
		})
	)
