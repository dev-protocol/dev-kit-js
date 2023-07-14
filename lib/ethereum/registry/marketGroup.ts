import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMarketGroupCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createMarketGroupCaller: CreateMarketGroupCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'marketGroup',
			mutation: false,
		}),
	)
