/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import { always } from 'ramda'

export type CreateMarketVotingBlocksCaller = (
	contract: Contract
) => () => Promise<string>

export const createMarketVotingBlocksCaller: CreateMarketVotingBlocksCaller = (
	contract: Contract
) =>
	always(
		execute({
			contract,
			method: 'marketVotingBlocks',
		})
	)
