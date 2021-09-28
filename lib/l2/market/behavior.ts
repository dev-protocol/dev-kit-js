/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'
import { always } from 'ramda'

export type CreateBehaviorCaller = (contract: Contract) => () => Promise<string>

export const createBehaviorCaller: CreateBehaviorCaller = (
	contract: Contract
) =>
	always(
		execute({
			contract,
			method: 'behavior',
		})
	)
