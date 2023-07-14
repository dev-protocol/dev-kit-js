import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMarketVotingBlocksCaller = (
	contract: ethers.Contract,
) => () => Promise<string>

export const createMarketVotingBlocksCaller: CreateMarketVotingBlocksCaller = (
	contract: ethers.Contract,
) =>
	always(
		execute<QueryOption>({
			contract,
			method: 'marketVotingBlocks',
			mutation: false,
		}),
	)
