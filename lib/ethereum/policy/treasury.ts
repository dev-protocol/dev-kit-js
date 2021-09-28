/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateTreasuryCaller = (contract: Contract) => () => Promise<string>

export const createTreasuryCaller: CreateTreasuryCaller = (
	contract: Contract
) =>
	always(
		execute({
			contract,
			method: 'treasury',
		})
	)
