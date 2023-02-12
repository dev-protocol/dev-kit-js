import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateMarketVotingSecondsCaller = (
	contract: ethers.Contract
) => () => Promise<string>

export const createMarketVotingSecondsCaller: CreateMarketVotingSecondsCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption>({
				contract,
				method: 'marketVotingSeconds',
				mutation: false,
			})
		)
