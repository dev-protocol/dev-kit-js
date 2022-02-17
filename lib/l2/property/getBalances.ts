import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type PropertyBalance = Readonly<{
	readonly account: string
	readonly balance: string
}>

export type CreateGetBalancesCaller = (
	contract: ethers.Contract
) => () => Promise<readonly PropertyBalance[]>

export const createGetBalancesCaller: CreateGetBalancesCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption, readonly PropertyBalance[]>({
				contract,
				method: 'getBalances',
				mutation: false,
			})
		)
